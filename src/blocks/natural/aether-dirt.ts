import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Aether Dirt
const AetherDirtBlockType = new CustomBlockType("aether:dirt", { solid: true });

AetherDirtBlockType.createPermutation({}); // Default permutation
AetherDirtBlockType.components.setHardness(0.5); // Set hardness for the block

AetherDirtBlockType.addTag("minecraft:is_shovel_item_destructible", "dirt") // Add tag for shovel tier destructibility

AetherDirtBlockType.setMaterialSound(BlockMaterialSound.DirtWithRoots);

AetherDirtBlockType.components.setLightDampening(0)

// Set the geometry for the block
AetherDirtBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherDirtBlockType.components.setMaterialInstances({
  "*": {
    texture: "aether_dirt",
    render_method: MaterialRenderMethod.Opaque,
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherDirtBlockType.identifier, 1, 1, 1);
AetherDirtBlockType.drops.push(loot); // Add the item drop to the block

export { AetherDirtBlockType };
