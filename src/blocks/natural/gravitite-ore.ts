import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Gravitite Ore
const AetherGravititeOreBlockType = new CustomBlockType("aether:gravitite_ore", { solid: true });

AetherGravititeOreBlockType.createPermutation({}); // Default permutation
AetherGravititeOreBlockType.components.setHardness(3); // Set hardness for the block

AetherGravititeOreBlockType.addTag("minecraft:is_pickaxe_item_destructible", "stone"); // Add tag for pickaxe tier destructibility

AetherGravititeOreBlockType.setMaterialSound(BlockMaterialSound.Stone);

// Set the geometry for the block
AetherGravititeOreBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherGravititeOreBlockType.components.setMaterialInstances({
  "*": {
    texture: "gravitite_ore",
    render_method: MaterialRenderMethod.Opaque,
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherGravititeOreBlockType.identifier, 1, 1, 1);
AetherGravititeOreBlockType.drops.push(loot); // Add the item drop to the block

export { AetherGravititeOreBlockType };
