import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Zanite Ore
const AetherZaniteOreBlockType = new CustomBlockType("aether:zanite_ore", { solid: true });

AetherZaniteOreBlockType.createPermutation({}); // Default permutation
AetherZaniteOreBlockType.components.setHardness(3); // Set hardness for the block

AetherZaniteOreBlockType.addTag("minecraft:is_pickaxe_item_destructible", "stone"); // Add tag for pickaxe tier destructibility

AetherZaniteOreBlockType.setMaterialSound(BlockMaterialSound.Stone);

// Set the geometry for the block
AetherZaniteOreBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherZaniteOreBlockType.components.setMaterialInstances({
  "*": {
    texture: "zanite_ore",
    render_method: MaterialRenderMethod.Opaque,
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherZaniteOreBlockType.identifier, 1, 1, 1);
AetherZaniteOreBlockType.drops.push(loot); // Add the item drop to the block

export { AetherZaniteOreBlockType };
