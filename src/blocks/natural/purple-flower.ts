import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Purple Flower
const AetherPurpleFlowerBlockType = new CustomBlockType("aether:purple_flower", { solid: false });

AetherPurpleFlowerBlockType.createPermutation({}); // Default permutation

AetherPurpleFlowerBlockType.addTag("plant") // Add tag for plants

AetherPurpleFlowerBlockType.components.setLightDampening(0)

// Set the collision box for the block
AetherPurpleFlowerBlockType.components.setCollisionBox({
  size: [0, 0, 0],
  origin: [0, 0, 0]
})

// Set the selection box for the block
AetherPurpleFlowerBlockType.components.setSelectionBox({
  size: [6, 9, 6],
  origin: [-3, 0, -3]
})

AetherPurpleFlowerBlockType.setMaterialSound(BlockMaterialSound.Sand);

// Set the geometry for the block
AetherPurpleFlowerBlockType.components.setGeometry({
  identifier: "minecraft:geometry.cross"
})

// Set the material instances for the block
AetherPurpleFlowerBlockType.components.setMaterialInstances({
  "*": {
    texture: "purple_flower",
    render_method: MaterialRenderMethod.AlphaTestSingleSided,
    ambient_occlusion: false,
    face_dimming: false
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherPurpleFlowerBlockType.identifier, 1, 1, 1);
AetherPurpleFlowerBlockType.drops.push(loot); // Add the item drop to the block

export { AetherPurpleFlowerBlockType };
