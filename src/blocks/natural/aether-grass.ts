import { BlockMaterialSound, CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

import { AetherDirtBlockType } from "./aether-dirt";

// Create a new custom block type for Aether Grass
const AetherGrassBlockType = new CustomBlockType("aether:grass_block", { solid: true });

AetherGrassBlockType.createPermutation({}); // Default permutation
AetherGrassBlockType.components.setHardness(0.6); // Set hardness for the block

AetherGrassBlockType.components.setLightDampening(0)

AetherGrassBlockType.addTag("minecraft:is_shovel_item_destructible", "dirt") // Add tag for shovel tier destructibility

AetherDirtBlockType.setMaterialSound(BlockMaterialSound.DirtWithRoots);

// Set the geometry for the block
AetherGrassBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherGrassBlockType.components.setMaterialInstances({
  "up": {
    texture: "aether_grass_block_top",
    render_method: MaterialRenderMethod.Opaque,
  },
  "north": {
    texture: "aether_grass_block_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "south": {
    texture: "aether_grass_block_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "west": {
    texture: "aether_grass_block_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "east": {
    texture: "aether_grass_block_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "down": {
    texture: "aether_dirt",
    render_method: MaterialRenderMethod.Opaque,
  }
})

// Create an item drop for the block
const loot = new ItemDrop(AetherDirtBlockType.identifier, 1, 1, 1);
AetherGrassBlockType.drops.push(loot); // Add the item drop to the block

export { AetherGrassBlockType };
