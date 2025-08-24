import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Ambrosium Ore
const AetherAmbrosiumOreBlockType = new CustomBlockType("aether:ambrosium_ore", { solid: true });

AetherAmbrosiumOreBlockType.createPermutation({}); // Default permutation
AetherAmbrosiumOreBlockType.components.setHardness(3); // Set hardness for the block

AetherAmbrosiumOreBlockType.addTag("minecraft:is_pickaxe_item_destructible", "stone"); // Add tag for pickaxe tier destructibility

AetherAmbrosiumOreBlockType.setMaterialSound(BlockMaterialSound.Stone);

// Set the geometry for the block
AetherAmbrosiumOreBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherAmbrosiumOreBlockType.components.setMaterialInstances({
  "*": {
    texture: "ambrosium_ore",
    render_method: MaterialRenderMethod.Opaque,
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherAmbrosiumOreBlockType.identifier, 1, 1, 1);
AetherAmbrosiumOreBlockType.drops.push(loot); // Add the item drop to the block

export { AetherAmbrosiumOreBlockType };
