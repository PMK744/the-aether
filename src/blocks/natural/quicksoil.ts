import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Quicksoil
const AetherQuicksoilBlockType = new CustomBlockType("aether:quicksoil", { solid: true });

AetherQuicksoilBlockType.createPermutation({}); // Default permutation
AetherQuicksoilBlockType.components.setHardness(0.5); // Set hardness for the block

AetherQuicksoilBlockType.addTag("minecraft:is_shovel_item_destructible", "dirt") // Add tag for shovel tier destructibility

AetherQuicksoilBlockType.setMaterialSound(BlockMaterialSound.Sand);

// Set the geometry for the block
AetherQuicksoilBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherQuicksoilBlockType.components.setMaterialInstances({
  "*": {
    texture: "quicksoil",
    render_method: MaterialRenderMethod.Opaque,
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherQuicksoilBlockType.identifier, 1, 1, 1);
AetherQuicksoilBlockType.drops.push(loot); // Add the item drop to the block

export { AetherQuicksoilBlockType };
