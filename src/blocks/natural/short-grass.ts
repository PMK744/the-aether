import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Short Grass
const AetherShortGrassBlockType = new CustomBlockType("aether:short_grass", { solid: false });

AetherShortGrassBlockType.createPermutation({}); // Default permutation

AetherShortGrassBlockType.addTag("plant") // Add tag for plants

// Set the collision box for the block
AetherShortGrassBlockType.components.setCollisionBox({
  size: [0, 0, 0],
  origin: [0, 0, 0]
})

// Set the selection box for the block
AetherShortGrassBlockType.components.setSelectionBox({
  size: [10, 11, 10],
  origin: [-5, 0, -5]
})

AetherShortGrassBlockType.setMaterialSound(BlockMaterialSound.Sand);

// Set the geometry for the block
AetherShortGrassBlockType.components.setGeometry({
  identifier: "minecraft:geometry.cross"
})

// Set the material instances for the block
AetherShortGrassBlockType.components.setMaterialInstances({
  "*": {
    texture: "aether_short_grass",
    render_method: MaterialRenderMethod.AlphaTestSingleSided,
    ambient_occlusion: false,
    face_dimming: false
  }
})

export { AetherShortGrassBlockType };
