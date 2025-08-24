import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Icestone
const AetherIcestoneBlockType = new CustomBlockType("aether:icestone", { solid: true });

AetherIcestoneBlockType.createPermutation({}); // Default permutation
AetherIcestoneBlockType.components.setHardness(3); // Set hardness for the block

AetherIcestoneBlockType.addTag("minecraft:is_pickaxe_item_destructible", "stone"); // Add tag for pickaxe tier destructibility

AetherIcestoneBlockType.setMaterialSound(BlockMaterialSound.Stone);

// Set the geometry for the block
AetherIcestoneBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherIcestoneBlockType.components.setMaterialInstances({
  "*": {
    texture: "icestone",
    render_method: MaterialRenderMethod.Opaque,
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherIcestoneBlockType.identifier, 1, 1, 1);
AetherIcestoneBlockType.drops.push(loot); // Add the item drop to the block

export { AetherIcestoneBlockType };
