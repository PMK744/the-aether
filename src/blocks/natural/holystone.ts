import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Holystone
const AetherHolystoneBlockType = new CustomBlockType("aether:holystone", { solid: true });

AetherHolystoneBlockType.createPermutation({}); // Default permutation
AetherHolystoneBlockType.components.setHardness(1.5); // Set hardness for the block

AetherHolystoneBlockType.addTag("minecraft:is_pickaxe_item_destructible", "stone"); // Add tag for pickaxe tier destructibility

AetherHolystoneBlockType.setMaterialSound(BlockMaterialSound.Stone);

// Set the geometry for the block
AetherHolystoneBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherHolystoneBlockType.components.setMaterialInstances({
  "*": {
    texture: "holystone",
    render_method: MaterialRenderMethod.Opaque,
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherHolystoneBlockType.identifier, 1, 1, 1);
AetherHolystoneBlockType.drops.push(loot); // Add the item drop to the block

export { AetherHolystoneBlockType };
