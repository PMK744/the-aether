import { BlockIdentifier, ItemStack, ItemType, ShapedCraftingRecipe } from "@serenityjs/core";

import { AetherSkyrootPlanksItemType } from "../../items";

// Create a new shapeless crafting recipe
const SkyrootPlanksCraftingTableRecipe = new ShapedCraftingRecipe("aether_c:skyroot_planks_crafting_table", ["crafting_table"])

// Add the ingredient to the recipe
SkyrootPlanksCraftingTableRecipe.addKey("P", AetherSkyrootPlanksItemType);

// Set the crafting pattern
SkyrootPlanksCraftingTableRecipe.pattern = ["PP", "PP", ""];

// Define the resultant item to be produced by the recipe
SkyrootPlanksCraftingTableRecipe.addResultant(new ItemStack(ItemType.get(BlockIdentifier.CraftingTable)!));

export { SkyrootPlanksCraftingTableRecipe };