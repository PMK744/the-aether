import { CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Aether Grass
const AetherSkyrootPlanksBlockType = new CustomBlockType("aether:skyroot_planks", { solid: true });
AetherSkyrootPlanksBlockType.createPermutation({}); // Default permutation

AetherSkyrootPlanksBlockType.components.setHardness(2); // Set hardness for the block

AetherSkyrootPlanksBlockType.addTag("minecraft:is_axe_item_destructible", "wood") // Add tag for axe tier destructibility

// Set the geometry for the block
AetherSkyrootPlanksBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherSkyrootPlanksBlockType.components.setMaterialInstances({
  "*": {
    texture: "skyroot_planks",
    render_method: MaterialRenderMethod.Opaque,
  },
})

// Create an item drop for the block
const loot = new ItemDrop(AetherSkyrootPlanksBlockType.identifier, 1, 1, 1);
AetherSkyrootPlanksBlockType.drops.push(loot); // Add the item drop to the block

export { AetherSkyrootPlanksBlockType };
