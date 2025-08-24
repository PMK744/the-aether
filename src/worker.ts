import {
  BlockIdentifier,
  BlockPermutation,
  Chunk,
  TerrainWorker,
  type TerrainGeneratorProperties,
  Worker
} from "@serenityjs/core";

import {
  AetherDirtBlockType,
  AetherGrassBlockType,
  AetherHolystoneBlockType,
  AetherIcestoneBlockType,
  AetherQuicksoilBlockType,
  AetherPurpleFlowerBlockType,
  AetherWhiteFlowerBlockType,
  AetherShortGrassBlockType,
  AetherAmbrosiumOreBlockType,
  AetherZaniteOreBlockType,
  AetherGravititeOreBlockType,
} from "./blocks";

import type { DimensionType } from "@serenityjs/protocol";
import { AetherIslandsGenerator } from "./generator";

@Worker(AetherIslandsGenerator)
class AetherIslandsWorker extends TerrainWorker {
  public static override readonly path = __filename;

  // --- Blocks ---
  private grass = AetherGrassBlockType.getPermutation();
  private dirt = AetherDirtBlockType.getPermutation();
  private holystone = AetherHolystoneBlockType.getPermutation();
  private icestone = AetherIcestoneBlockType.getPermutation();
  private quicksoil = AetherQuicksoilBlockType.getPermutation();
  private flowers = [AetherPurpleFlowerBlockType.getPermutation(), AetherWhiteFlowerBlockType.getPermutation()];
  private shortGrass = AetherShortGrassBlockType.getPermutation();
  private ambrosiumOre = AetherAmbrosiumOreBlockType.getPermutation();
  private zaniteOre = AetherZaniteOreBlockType.getPermutation();
  private gravititeOre = AetherGravititeOreBlockType.getPermutation();
  private readonly AIR = BlockPermutation.resolve(BlockIdentifier.Air);

  // ======= Tunables =======
  private seed: number;

  public constructor(generator: typeof AetherIslandsGenerator, properties: TerrainGeneratorProperties) {
    super(generator, properties);
    this.seed = properties.seed;
  }

  // --- Generation ---
  public override async apply(cx: number, cz: number, type: DimensionType): Promise<Chunk> {
    const chunk = new Chunk(cx, cz, type);

    const baseX = cx * 16;
    const baseZ = cz * 16;

    const yMin = -64;
    const yMax = 320;

    // record the surface for foliage passes (null = unknown)
    const topY: (number | null)[][] = Array.from({ length: 16 }, () => Array<number | null>(16).fill(null));
    const topIsGrass: boolean[][] = Array.from({ length: 16 }, () => Array<boolean>(16).fill(false));

    for (let lx = 0; lx < 16; lx++) {
      const wx = baseX + lx;

      for (let lz = 0; lz < 16; lz++) {
        const wz = baseZ + lz;

        const warp = this.fbm2(wx, wz, AetherIslandsGenerator.warpScale, 3) * AetherIslandsGenerator.warpAmp;
        const wxw = wx + warp;
        const wzw = wz - warp * 0.6;

        const mask = this.ridged2(wxw, wzw, AetherIslandsGenerator.islandMaskScale);
        if (mask < AetherIslandsGenerator.islandMaskCutoff) continue;

        const bandOffset = this.fbm2(wxw * 0.5, wzw * 0.5, AetherIslandsGenerator.islandMaskScale * 0.7) * AetherIslandsGenerator.layerRange;
        const centerY = AetherIslandsGenerator.layerBaseY + bandOffset;
        const halfThickness = AetherIslandsGenerator.thicknessMin + mask * AetherIslandsGenerator.thicknessVar;

        const yTop = Math.min(yMax, Math.ceil(centerY + halfThickness + 10));
        const yBot = Math.max(yMin, Math.floor(centerY - halfThickness - 10));

        // --- Quicksoil influences (flatter + base-of-hill, rarer) ---
        const qsNoise = this.fbm2(wxw, wzw, AetherIslandsGenerator.qsScale, 4);
        const t = (qsNoise + 1) * 0.5;

        // Low-frequency flatness probe (cheap slope estimate)
        const FLAT_SCALE = 1 / 72;
        const n0 = this.fbm2(wxw, wzw, FLAT_SCALE, 3);
        const nx = this.fbm2(wxw + 1, wzw, FLAT_SCALE, 3);
        const nz = this.fbm2(wxw, wzw + 1, FLAT_SCALE, 3);
        const slope = Math.min(1, (Math.abs(nx - n0) + Math.abs(nz - n0)) * 3.0);
        const flatFavor = 1 - slope;

        const baseQsDepth = Math.round(
          AetherIslandsGenerator.qsDepthMin + t * (AetherIslandsGenerator.qsDepthMax - AetherIslandsGenerator.qsDepthMin)
        );

        let qsRemaining = 0;
        let soil = 0;

        for (let y = yTop; y >= yBot; y--) {
          const dy = Math.abs(y - centerY);
          const verticalMask = 1 - Math.min(1, dy / (halfThickness + 1e-6));
          if (verticalMask <= 0) continue;

          const shape = this.fbm3(wxw, y, wzw, AetherIslandsGenerator.shapeScale, 4);
          const caves = this.fbm3(wxw + 1000, y + 2000, wzw - 500, AetherIslandsGenerator.cavesScale, 3);

          const density =
            AetherIslandsGenerator.densityAmp * shape * verticalMask -
            AetherIslandsGenerator.caveAmp * (caves * 0.5 + 0.5) -
            AetherIslandsGenerator.densityThreshold;

          if (density > 0) {
            const pos = { x: lx, y, z: lz };

            if (soil === 0) {
              const relHeight = (y - centerY) / (halfThickness + 1e-6);
              const baseBias = Math.max(0, (-relHeight + 0.10) * 0.9);
              const edgePenalty = Math.max(0, 0.60 - verticalMask) * (AetherIslandsGenerator.qsEdgeFavor * 4.0);
              const crestPenalty = Math.max(0, verticalMask - 0.90) * 2.0;

              const basePlains = qsNoise > (AetherIslandsGenerator.qsPlainsThreshold - 0.06);
              const desertScore =
                qsNoise * 0.75 +
                flatFavor * 0.40 +
                baseBias * 0.40 -
                edgePenalty -
                crestPenalty;

              const isQuicksoilTop =
                basePlains &&
                (desertScore > (AetherIslandsGenerator.qsPlainsThreshold + 0.06)) &&
                (slope < 0.45) &&
                (verticalMask > 0.52) &&
                (verticalMask < 0.93);

              // record surface for foliage pass
              topY[lx]![lz] = y;
              topIsGrass[lx]![lz] = !isQuicksoilTop;

              if (isQuicksoilTop) {
                const depthBoost = Math.floor(flatFavor * 1.5 + baseBias * 0.5);
                const qsDepth = Math.max(
                  AetherIslandsGenerator.qsDepthMin,
                  Math.min(AetherIslandsGenerator.qsDepthMax, baseQsDepth + depthBoost)
                );
                chunk.setPermutation(pos, this.quicksoil, 0, false);
                qsRemaining = Math.max(0, qsDepth - 1);
              } else {
                chunk.setPermutation(pos, this.grass, 0, false);
              }
              soil++;

            } else if (qsRemaining > 0) {
              chunk.setPermutation(pos, this.quicksoil, 0, false);
              qsRemaining--;
              soil++;

            } else if (soil < AetherIslandsGenerator.topSoilDepth) {
              chunk.setPermutation(pos, this.dirt, 0, false);
              soil++;

            } else {
              // --- Holystone deep layer with Icestone veins + Ores ---
              const isIce = this.isIcestoneVein(wxw, y, wzw);
              const ore = this.pickOre(wxw, y, wzw);
              if (ore) {
                chunk.setPermutation(pos, ore, 0, false);
              } else {
                chunk.setPermutation(pos, isIce ? this.icestone : this.holystone, 0, false);
              }
              soil++;
            }

          } else {
            if (soil > 0 && dy > halfThickness + 6) {
              soil = 0;
              qsRemaining = 0;
            }
          }
        }
      }
    }

    // --- Flowers post-pass (on grass surfaces) ---
    type FCand = { lx: number; lz: number; wx: number; wz: number; y: number; score: number };
    const fcands: FCand[] = [];

    for (let lx = 0; lx < 16; lx++) {
      const wx = baseX + lx;
      for (let lz = 0; lz < 16; lz++) {
        const wz = baseZ + lz;

        const ySurf = topY[lx]![lz];
        if (ySurf == null) continue;
        if (!topIsGrass[lx]![lz]) continue;

        const warp = this.fbm2(wx, wz, AetherIslandsGenerator.warpScale, 3) * AetherIslandsGenerator.warpAmp;
        const wxw = wx + warp;
        const wzw = wz - warp * 0.6;

        const mask = this.ridged2(wxw, wzw, AetherIslandsGenerator.islandMaskScale);
        if (mask < AetherIslandsGenerator.islandMaskCutoff) continue;

        const bandOffset = this.fbm2(wxw * 0.5, wzw * 0.5, AetherIslandsGenerator.islandMaskScale * 0.7) * AetherIslandsGenerator.layerRange;
        const centerY = AetherIslandsGenerator.layerBaseY + bandOffset;
        const halfThickness = AetherIslandsGenerator.thicknessMin + mask * AetherIslandsGenerator.thicknessVar;

        const dy = Math.abs(ySurf - centerY);
        const verticalMask = 1 - Math.min(1, dy / (halfThickness + 1e-6));

        const field = (this.fbm2(wxw, wzw, AetherIslandsGenerator.flowerScale, 4) + 1) * 0.5; // [0,1]

        const nY = this.topYOr(topY, lx + 1, lz, ySurf);
        const sY = this.topYOr(topY, lx - 1, lz, ySurf);
        const eY = this.topYOr(topY, lx, lz + 1, ySurf);
        const wY = this.topYOr(topY, lx, lz - 1, ySurf);
        const localSlope = Math.max(Math.abs(nY - ySurf), Math.abs(sY - ySurf), Math.abs(eY - ySurf), Math.abs(wY - ySurf));

        const edgePenalty = Math.max(0, 0.58 - verticalMask) * 0.15;
        const slopePenalty = Math.max(0, localSlope - 1) * 0.25;

        const score = field - (AetherIslandsGenerator.flowerThreshold - 0.08 * verticalMask) - edgePenalty - slopePenalty;

        if (score > 0) {
          fcands.push({ lx, lz, wx, wz, y: ySurf + 1, score });
        }
      }
    }

    fcands.sort((a, b) => b.score - a.score);

    const flowerPlaced: Array<{ x: number; z: number }> = [];
    const flowerFarEnough = (x: number, z: number) => {
      for (const p of flowerPlaced) {
        if (Math.max(Math.abs(p.x - x), Math.abs(p.z - z)) < AetherIslandsGenerator.flowerMinSpacing) return false;
      }
      return true;
    };

    for (const c of fcands) {
      if (flowerPlaced.length >= AetherIslandsGenerator.flowerMaxPerChunk) break;
      if (!flowerFarEnough(c.lx, c.lz)) continue;

      // occupancy check: skip only if NON-AIR
      const existing = (chunk as any).getPermutation?.({ x: c.lx, y: c.y, z: c.lz }) as BlockPermutation | undefined;
      if (existing && existing.networkId !== this.AIR.networkId) continue;

      const r = this.rand01(c.wx, c.wz, 54321);
      const idx = Math.floor(r * this.flowers.length) % this.flowers.length;

      chunk.setPermutation({ x: c.lx, y: c.y, z: c.lz }, this.flowers[idx]!, 0, false);
      flowerPlaced.push({ x: c.lx, z: c.lz });
    }

    // --- Short grass post-pass (fill meadows between flowers) ---
    type GCand = { lx: number; lz: number; wx: number; wz: number; y: number; score: number };
    const gcands: GCand[] = [];

    for (let lx = 0; lx < 16; lx++) {
      const wx = baseX + lx;
      for (let lz = 0; lz < 16; lz++) {
        const wz = baseZ + lz;

        const ySurf = topY[lx]![lz];
        if (ySurf == null) continue;
        if (!topIsGrass[lx]![lz]) continue;

        const warp = this.fbm2(wx, wz, AetherIslandsGenerator.warpScale, 3) * AetherIslandsGenerator.warpAmp;
        const wxw = wx + warp;
        const wzw = wz - warp * 0.6;

        const mask = this.ridged2(wxw, wzw, AetherIslandsGenerator.islandMaskScale);
        if (mask < AetherIslandsGenerator.islandMaskCutoff) continue;

        const bandOffset = this.fbm2(wxw * 0.5, wzw * 0.5, AetherIslandsGenerator.islandMaskScale * 0.7) * AetherIslandsGenerator.layerRange;
        const centerY = AetherIslandsGenerator.layerBaseY + bandOffset;
        const halfThickness = AetherIslandsGenerator.thicknessMin + mask * AetherIslandsGenerator.thicknessVar;

        const dy = Math.abs(ySurf - centerY);
        const verticalMask = 1 - Math.min(1, dy / (halfThickness + 1e-6));

        const field = (this.fbm2(wxw, wzw, AetherIslandsGenerator.shortGrassScale, 3) + 1) * 0.5; // [0,1]

        const nY = this.topYOr(topY, lx + 1, lz, ySurf);
        const sY = this.topYOr(topY, lx - 1, lz, ySurf);
        const eY = this.topYOr(topY, lx, lz + 1, ySurf);
        const wY = this.topYOr(topY, lx, lz - 1, ySurf);
        const localSlope = Math.max(Math.abs(nY - ySurf), Math.abs(sY - ySurf), Math.abs(eY - ySurf), Math.abs(wY - ySurf));

        const edgePenalty = Math.max(0, 0.52 - verticalMask) * 0.12;
        const slopePenalty = Math.max(0, localSlope - 2) * 0.20;

        const score = field - (AetherIslandsGenerator.shortGrassThreshold - 0.05 * verticalMask) - edgePenalty - slopePenalty;

        if (score > 0) {
          const y = ySurf + 1;
          // occupancy check: skip only if NON-AIR
          const existing = (chunk as any).getPermutation?.({ x: lx, y, z: lz }) as BlockPermutation | undefined;
          if (existing && existing.networkId !== this.AIR.networkId) continue;

          gcands.push({ lx, lz, wx, wz, y, score });
        }
      }
    }

    gcands.sort((a, b) => b.score - a.score);

    const grassPlaced: Array<{ x: number; z: number }> = [];
    const grassFarEnough = (x: number, z: number) => {
      for (const p of grassPlaced) {
        if (Math.max(Math.abs(p.x - x), Math.abs(p.z - z)) < AetherIslandsGenerator.shortGrassMinSpacing) return false;
      }
      // keep one-block distance from flowers for visuals
      for (const p of flowerPlaced) {
        if (Math.max(Math.abs(p.x - x), Math.abs(p.z - z)) < 1) return false;
      }
      return true;
    };

    for (const c of gcands) {
      if (grassPlaced.length >= AetherIslandsGenerator.shortGrassMaxPerChunk) break;
      if (!grassFarEnough(c.lx, c.lz)) continue;

      // occupancy check: skip only if NON-AIR
      const existing = (chunk as any).getPermutation?.({ x: c.lx, y: c.y, z: c.lz }) as BlockPermutation | undefined;
      if (existing && existing.networkId !== this.AIR.networkId) continue;

      chunk.setPermutation({ x: c.lx, y: c.y, z: c.lz }, this.shortGrass, 0, false);
      grassPlaced.push({ x: c.lx, z: c.lz });
    }

    return chunk;
  }

  // ======= Ore selector (clusters + rarity + Y filter for Gravitite) =======
  private pickOre(wxw: number, y: number, wzw: number): BlockPermutation | null {
    // 1) Regional gate so ores don’t appear everywhere
    const region = (this.fbm2(wxw + 1234, wzw - 1234, AetherIslandsGenerator.oreRegionScale, 2) + 1) * 0.5;
    if (region < AetherIslandsGenerator.oreRegionThreshold) return null;

    // 2) Per-cell random skip to thin whatever passes the mask
    const jitter = this.hash3(Math.floor(wxw), Math.floor(y), Math.floor(wzw), this.seed ^ 0x0ddba11);
    if (jitter < AetherIslandsGenerator.oreJitterSkip) return null;

    // 3) Order: rarest first so common ores don’t override
    // Gravitite (rare, deep)
    if (y <= AetherIslandsGenerator.oreGravititeYMax) {
      const gField = (this.fbm3(wxw + 9000, y * 1.2, wzw - 9000, AetherIslandsGenerator.oreGravititeScale, 3) + 1) * 0.5;
      if (gField > AetherIslandsGenerator.oreGravititeThreshold) {
        const r = this.hash3(Math.floor(wxw), Math.floor(y), Math.floor(wzw), this.seed ^ 0x77f00d);
        if (r > AetherIslandsGenerator.oreGravititePorosity) return this.gravititeOre;
      }
    }

    // Zanite (uncommon)
    {
      const zField = (this.fbm3(wxw - 5000, y * 0.9, wzw + 5000, AetherIslandsGenerator.oreZaniteScale, 3) + 1) * 0.5;
      if (zField > AetherIslandsGenerator.oreZaniteThreshold) {
        const r = this.hash3(Math.floor(wxw), Math.floor(y), Math.floor(wzw), this.seed ^ 0x51c0ffee);
        if (r > AetherIslandsGenerator.oreZanitePorosity) return this.zaniteOre;
      }
    }

    // Ambrosium (common but now very fine + sparse)
    {
      const aField = (this.fbm3(wxw + 2500, y, wzw - 2500, AetherIslandsGenerator.oreAmbrosiumScale, 3) + 1) * 0.5;
      if (aField > AetherIslandsGenerator.oreAmbrosiumThreshold) {
        const r = this.hash3(Math.floor(wxw), Math.floor(y), Math.floor(wzw), this.seed ^ 0x42ab1e);
        if (r > AetherIslandsGenerator.oreAmbrosiumPorosity) return this.ambrosiumOre;
      }
    }

    return null;
  }


  // ======= Icestone vein predicate =======
  private isIcestoneVein(wxw: number, y: number, wzw: number): boolean {
    if (y < AetherIslandsGenerator.icestoneVeinYMin || y > AetherIslandsGenerator.icestoneVeinYMax) return false;

    // Regional mask so veins appear in clusters, not everywhere
    const region = this.fbm3(wxw + 3500, y * 0.8, wzw - 3500, AetherIslandsGenerator.icestoneMaskScale, 2); // [-1,1]
    if (region <= AetherIslandsGenerator.icestoneMaskThreshold) return false;

    // Thin “stripe” core (abs near zero) makes vein sheets/lines
    const stripe = this.fbm3(wxw, y * 1.3, wzw, AetherIslandsGenerator.icestoneVeinScale, 3); // [-1,1]
    if (Math.abs(stripe) >= AetherIslandsGenerator.icestoneVeinThickness) return false;

    // Porosity so cores aren’t solid slabs
    const holes = this.hash3(Math.floor(wxw), Math.floor(y), Math.floor(wzw), this.seed ^ 0x5bf03635);
    if (holes < AetherIslandsGenerator.icestoneVeinPorosity) return false;

    return true;
  }

  // ======= Noise helpers (fast value-noise, deterministic, no deps) =======
  private fade(t: number) { return t * t * (3 - 2 * t); }
  private lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

  private hash3(ix: number, iy: number, iz: number, seed: number) {
    let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(iz, 1442695041) ^ seed;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  private hash2(ix: number, iz: number, seed: number) {
    let h = Math.imul(ix, 374761393) ^ Math.imul(iz, 668265263) ^ seed;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  private valueNoise3(x: number, y: number, z: number, seed: number) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = x - xi, yf = y - yi, zf = z - zi;
    const u = this.fade(xf), v = this.fade(yf), w = this.fade(zf);

    const n000 = this.hash3(xi, yi, zi, seed);
    const n100 = this.hash3(xi + 1, yi, zi, seed);
    const n010 = this.hash3(xi, yi + 1, zi, seed);
    const n110 = this.hash3(xi + 1, yi + 1, zi, seed);
    const n001 = this.hash3(xi, yi, zi + 1, seed);
    const n101 = this.hash3(xi + 1, yi, zi + 1, seed);
    const n011 = this.hash3(xi, yi + 1, zi + 1, seed);
    const n111 = this.hash3(xi + 1, yi + 1, zi + 1, seed);

    const x00 = this.lerp(n000, n100, u);
    const x10 = this.lerp(n010, n110, u);
    const x01 = this.lerp(n001, n101, u);
    const x11 = this.lerp(n011, n111, u);

    const y0 = this.lerp(x00, x10, v);
    const y1 = this.lerp(x01, x11, v);

    return this.lerp(y0, y1, w);
  }

  private valueNoise2(x: number, z: number, seed: number) {
    const xi = Math.floor(x), zi = Math.floor(z);
    const xf = x - xi, zf = z - zi;
    const u = this.fade(xf), w = this.fade(zf);

    const n00 = this.hash2(xi, zi, seed);
    const n10 = this.hash2(xi + 1, zi, seed);
    const n01 = this.hash2(xi, zi + 1, seed);
    const n11 = this.hash2(xi + 1, zi + 1, seed);

    const x0 = this.lerp(n00, n10, u);
    const x1 = this.lerp(n01, n11, u);
    return this.lerp(x0, x1, w);
  }

  private fbm3(x: number, y: number, z: number, scale: number, octaves = 4, lacunarity = 2, gain = 0.5) {
    let amp = 0.5, freq = 1, sum = 0;
    for (let i = 0; i < octaves; i++) {
      sum += amp * (this.valueNoise3(x * scale * freq, y * scale * freq, z * scale * freq, this.seed + i) * 2 - 1);
      amp *= gain;
      freq *= lacunarity;
    }
    return sum;
  }

  private fbm2(x: number, z: number, scale: number, octaves = 4, lacunarity = 2, gain = 0.5) {
    let amp = 0.5, freq = 1, sum = 0;
    for (let i = 0; i < octaves; i++) {
      sum += amp * (this.valueNoise2(x * scale * freq, z * scale * freq, this.seed + 101 * i) * 2 - 1);
      amp *= gain;
      freq *= lacunarity;
    }
    return sum;
  }

  private ridged2(x: number, z: number, scale: number) {
    const n = this.fbm2(x, z, scale);
    return 1 - Math.abs(n);
  }

  private rand01(x: number, z: number, salt = 0): number {
    return this.hash2(Math.floor(x), Math.floor(z), (this.seed ^ 0x9E3779B9) + salt);
  }

  // ======= Safe helpers for array access =======
  private clamp16(n: number) { return n < 0 ? 0 : (n > 15 ? 15 : n); }
  private topYOr(arr: (number | null)[][], x: number, z: number, or: number): number {
    const xx = this.clamp16(x);
    const zz = this.clamp16(z);
    const row = arr[xx];
    if (!row) return or;
    const v = row[zz];
    return (v == null) ? or : v;
  }
}

export { AetherIslandsWorker };
