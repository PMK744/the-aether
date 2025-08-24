import { BlockIdentifier, BlockPermutation, Chunk, Dimension, TerrainGenerator, type TerrainGeneratorProperties } from "@serenityjs/core";
import { AetherDirtBlockType, AetherGrassBlockType, AetherSkyrootLeavesBlockType, AetherSkyrootLogBlockType } from "./blocks";

class AetherIslandsGenerator extends TerrainGenerator {
  public static override readonly identifier = "the-aether";

  // Island placement / shape
  public static islandMaskScale = 1 / 380;  // was 1/280 → larger, fewer islands
  public static islandMaskCutoff = 0.58;

  public static layerBaseY = 20;
  public static layerRange = 90;            // was 70 → taller band variation

  public static thicknessMin = 24;          // was 14 → thicker cores
  public static thicknessVar = 38;          // was 20 → thicker where mask is strong

  public static shapeScale = 1 / 56;        // was 1/48 → slightly smoother mass
  public static cavesScale = 1 / 26;
  public static warpScale = 1 / 220;        // was 1/180 → gentler warping
  public static warpAmp = 14;               // was 18  → less edge wobble

  public static densityAmp = 1.15;
  public static caveAmp = 0.42;
  public static densityThreshold = 0.04;    // was 0.06 → fuller bodies
  public static topSoilDepth = 4;

  // --- Icestone vein controls ---
  public static icestoneVeinScale = 1 / 22;       // frequency of vein “stripes” (bigger denom = thicker spacing)
  public static icestoneVeinThickness = 0.13;     // |noise| < thickness ⇒ inside vein (0.08–0.18 good)
  public static icestoneMaskScale = 1 / 110;      // regional mask so veins appear in clusters
  public static icestoneMaskThreshold = 0.10;     // higher ⇒ fewer regions with veins (-1..1 range)
  public static icestoneVeinPorosity = 0.18;      // fraction of vein voxels randomly removed (0 = solid sheets)
  public static icestoneVeinYMin = -64;           // vertical range for veins
  public static icestoneVeinYMax = 255;


  // --- Quicksoil plains controls ---
  public static qsScale = 1 / 220;          // was 1/180 → broader, smoother plains
  public static qsPlainsThreshold = 0.52;   // was 0.35 → much rarer deserts
  public static qsEdgeFavor = 0.08;         // was 0.20 → avoid rim “beaches”
  public static qsDepthMin = 2;
  public static qsDepthMax = 5;

  // --- Flower controls ---
  public static flowerScale = 1 / 32;       // noise scale for meadows
  public static flowerThreshold = 0.75;     // higher ⇒ fewer flowers
  public static flowerMinSpacing = 3;       // Chebyshev spacing in-chunk
  public static flowerMaxPerChunk = 18;     // cap per chunk

  // --- Ore generation (tiny blobs but actually present) ---
  public static oreRegionScale = 1 / 220;  // was 1/260
  public static oreRegionThreshold = 0.48;     // was 0.62 (allow more regions)
  public static oreJitterSkip = 0.12;     // was 0.35 (skip fewer cells)

  public static oreAmbrosiumScale = 1 / 7;    // tiny clusters (keep)
  public static oreAmbrosiumThreshold = 0.68;     // was 0.72
  public static oreAmbrosiumPorosity = 0.55;     // was 0.68

  public static oreZaniteScale = 1 / 8;    // tiny clusters (keep)
  public static oreZaniteThreshold = 0.74;     // was 0.80
  public static oreZanitePorosity = 0.60;     // was 0.75

  public static oreGravititeScale = 1 / 10;   // tiny clusters (keep)
  public static oreGravititeThreshold = 0.76;     // was 0.86
  public static oreGravititePorosity = 0.60;     // was 0.82
  public static oreGravititeYMax = 75;       // unchanged

  // --- Short grass controls ---
  public static shortGrassScale = 1 / 28;     // coarser than flowers → broader patches
  public static shortGrassThreshold = 0.50;   // higher ⇒ fewer tufts
  public static shortGrassMinSpacing = 1;     // Chebyshev spacing (avoid clumping in same tile)
  public static shortGrassMaxPerChunk = 64;   // cap per chunk (tweak 48–96 to taste)

  // --- Tree controls ---
  public static treeScale = 1 / 64;         // patchiness of forest areas
  public static treeThreshold = 0.62;       // higher ⇒ fewer trees overall
  public static treeMinSpacing = 4;         // Chebyshev spacing per chunk
  public static treeMaxPerChunk = 6;        // hard cap per chunk

  public static treeMinHeight = 4;          // trunk height range
  public static treeMaxHeight = 7;
  public static treeCanopyRadius = 2;       // base radius at widest ring
  public static treeEdgeRootSupport = 7;    // require ≥ this many solid blocks in a 3×3 under trunk

  // --- Leaf controls ---
  public static leafExtraRimChance = 0.15; // chance mid-layers get +1 ring
  public static leafInfillChance = 0.70; // chance to fill small air gaps
  public static leafDrapeChance = 0.20; // chance to hang a leaf under rim


  private log = AetherSkyrootLogBlockType.getPermutation();
  private leaves = AetherSkyrootLeavesBlockType.getPermutation();

  public readonly seed: number;

  public constructor(dimension: Dimension, properties: TerrainGeneratorProperties) {
    super(dimension, properties);

    this.seed = properties.seed;
  }

  public override async apply(cx: number, cz: number): Promise<Chunk> {
    const chunk = await this.handoff(cx, cz);

    return chunk;
  }

  public override async populate(chunk: Chunk): Promise<void> {
    const { x: cx, z: cz } = chunk;
    const CHUNK = 16;
    const worldX0 = cx * CHUNK;
    const worldZ0 = cz * CHUNK;
    const Y_TOP = 255; // adjust if your Dimension exposes a max height

    // Deterministic RNG per chunk
    const rng = (() => {
      let t = (this.seed ^ (cx * 0x9e3779b1) ^ (cz * 0x85ebca6b)) >>> 0;
      return () => {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
      };
    })();

    // Cheap hash-noise in [0,1)
    const n2 = (x: number, z: number) => {
      const s = Math.sin(x * 127.1 + z * 311.7 + this.seed * 0.0001) * 43758.5453;
      return s - Math.floor(s);
    };

    // Dimension-level helpers (world coords)
    const getPermW = (wx: number, y: number, wz: number) =>
      this.dimension.getPermutation({ x: wx, y, z: wz });

    const setPermW = (wx: number, y: number, wz: number, p: BlockPermutation) => {
      const cx = wx >> 4;
      const cz = wz >> 4;

      const chunk = this.dimension.getChunk(cx, cz);

      chunk.setPermutation({ x: wx, y, z: wz }, p);
    }

    const isAir = (p?: BlockPermutation) =>
      !p || p.type.identifier === BlockIdentifier.Air;

    const isSoil = (p?: BlockPermutation) =>
      !!p &&
      (p.type.identifier === AetherGrassBlockType.identifier ||
        p.type.identifier === AetherDirtBlockType.identifier);

    const getTopSolidY = (wx: number, wz: number, yTop = Y_TOP) => {
      for (let y = yTop; y >= 0; y--) {
        const p = getPermW(wx, y, wz);
        if (!isAir(p)) return y;
      }
      return -1;
    };

    const hasRootSupport = (wx: number, y: number, wz: number) => {
      let solid = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          const p = getPermW(wx + dx, y - 1, wz + dz);
          if (p && !isAir(p)) solid++;
        }
      }
      return solid >= AetherIslandsGenerator.treeEdgeRootSupport;
    };

    const placeTree = (wx: number, y: number, wz: number) => {
      const h =
        AetherIslandsGenerator.treeMinHeight +
        Math.floor(
          rng() *
          (AetherIslandsGenerator.treeMaxHeight -
            AetherIslandsGenerator.treeMinHeight + 1)
        );

      // Trunk
      for (let i = 0; i < h; i++) {
        const ty = y + 1 + i;
        if (isAir(getPermW(wx, ty, wz))) setPermW(wx, ty, wz, this.log);
        else return false;
      }

      const leafId = this.leaves.type.identifier;
      const isLeaves = (p?: BlockPermutation) => !!p && p.type.identifier === leafId;

      // Canopy (slightly denser)
      const R = AetherIslandsGenerator.treeCanopyRadius;
      const cy = y + h;

      for (let dy = -R; dy <= R; dy++) {
        // Mid layers (|dy| ≤ 1) sometimes get an extra rim for fullness
        const extra =
          Math.abs(dy) <= 1 && rng() < AetherIslandsGenerator.leafExtraRimChance
            ? 1
            : 0;

        const ring = R - Math.abs(dy) + extra;

        for (let dx = -R - 1; dx <= R + 1; dx++) {
          for (let dz = -R - 1; dz <= R + 1; dz++) {
            const dist = Math.max(Math.abs(dx), Math.abs(dz));
            if (dist > ring) continue;

            const fuzz = (rng() - 0.5) * 0.25;
            if (dist + fuzz <= ring) {
              const bx = wx + dx, by = cy + dy, bz = wz + dz;
              if (isAir(getPermW(bx, by, bz))) setPermW(bx, by, bz, this.leaves);

              // Light “drape” of leaves just under the rim
              if (
                dist >= ring - 0.5 &&
                isAir(getPermW(bx, by - 1, bz)) &&
                rng() < AetherIslandsGenerator.leafDrapeChance
              ) {
                setPermW(bx, by - 1, bz, this.leaves);
              }
            }
          }
        }
      }

      // Infill pass: fill small holes adjacent to ≥3 leaf neighbors (very local, cheap)
      for (let dy = -R; dy <= R; dy++) {
        for (let dx = -R; dx <= R; dx++) {
          for (let dz = -R; dz <= R; dz++) {
            const bx = wx + dx, by = cy + dy, bz = wz + dz;
            if (!isAir(getPermW(bx, by, bz))) continue;

            let nb = 0;
            if (isLeaves(getPermW(bx + 1, by, bz))) nb++;
            if (isLeaves(getPermW(bx - 1, by, bz))) nb++;
            if (isLeaves(getPermW(bx, by + 1, bz))) nb++;
            if (isLeaves(getPermW(bx, by - 1, bz))) nb++;
            if (isLeaves(getPermW(bx, by, bz + 1))) nb++;
            if (isLeaves(getPermW(bx, by, bz - 1))) nb++;

            if (nb >= 3 && rng() < AetherIslandsGenerator.leafInfillChance) {
              setPermW(bx, by, bz, this.leaves);
            }
          }
        }
      }

      // Top tuft
      if (isAir(getPermW(wx, cy + R + 1, wz))) setPermW(wx, cy + R + 1, wz, this.leaves);
      return true;
    };


    // Candidate selection with spacing + cap
    const placed: Array<[number, number]> = [];
    let count = 0;

    const step = 3; // coarse scan; spacing enforces real min gaps
    for (let lx = 0; lx < CHUNK; lx += step) {
      for (let lz = 0; lz < CHUNK; lz += step) {
        if (count >= AetherIslandsGenerator.treeMaxPerChunk) break;

        // Forest patch gate (world coords)
        const wx = worldX0 + lx;
        const wz = worldZ0 + lz;
        const noise = n2(wx * AetherIslandsGenerator.treeScale, wz * AetherIslandsGenerator.treeScale);
        if (noise < AetherIslandsGenerator.treeThreshold) continue;

        // Jitter inside the cell
        const jx = Math.min(CHUNK - 1, lx + Math.floor(rng() * step));
        const jz = Math.min(CHUNK - 1, lz + Math.floor(rng() * step));
        const wjx = worldX0 + jx;
        const wjz = worldZ0 + jz;

        // Surface & ground check
        const topY = getTopSolidY(wjx, wjz);
        if (topY <= 0) continue;

        const ground = getPermW(wjx, topY, wjz);
        if (!isSoil(ground)) continue;

        // Spacing within this chunk (Chebyshev in local coords)
        const ok = placed.every(
          ([px, pz]) =>
            Math.max(Math.abs(px - jx), Math.abs(pz - jz)) >=
            AetherIslandsGenerator.treeMinSpacing
        );
        if (!ok) continue;

        if (!hasRootSupport(wjx, topY, wjz)) continue;

        if (placeTree(wjx, topY, wjz)) {
          placed.push([jx, jz]);
          count++;
        }
      }
    }
  }
}

export { AetherIslandsGenerator };