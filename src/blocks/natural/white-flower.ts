import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Wurple Flower
const AetherWhiteFlowerBlockType = new CustomBlockType("aether:white_flower", { solid: false });

AetherWhiteFlowerBlockType.createPermutation({}); // Default permutation

AetherWhiteFlowerBlockType.addTag("plant") // Add tag for plants

AetherWhiteFlowerBlockType.components.setLightDampening(0)

// Set the collision box for the block
AetherWhiteFlowerBlockType.components.setCollisionBox({
  size: [0, 0, 0],
  origin: [0, 0, 0]
})

// Set the selection box for the block
AetherWhiteFlowerBlockType.components.setSelectionBox({
  size: [6, 11, 6],
  origin: [-3, 0, -3]
})

AetherWhiteFlowerBlockType.setMaterialSound(BlockMaterialSound.Sand);

// Set the geometry for the block
AetherWhiteFlowerBlockType.components.setGeometry({
  identifier: "minecraft:geometry.cross"
})

// Set the material instances for the block
AetherWhiteFlowerBlockType.components.setMaterialInstances({
  "*": {
    texture: "white_flower",
    render_method: MaterialRenderMethod.AlphaTestSingleSided,
    ambient_occlusion: false,
    face_dimming: false
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherWhiteFlowerBlockType.identifier, 1, 1, 1);
AetherWhiteFlowerBlockType.drops.push(loot); // Add the item drop to the block

export { AetherWhiteFlowerBlockType };
