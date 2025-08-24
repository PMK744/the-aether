import { ItemIdentifier, ItemStack, ItemType, ShapedCraftingRecipe } from "@serenityjs/core";

import { AetherSkyrootPlanksItemType } from "../../items";

// Create a new shapeless crafting recipe
const SkyrootPlanksSticksRecipe = new ShapedCraftingRecipe("aether_c:skyroot_planks_sticks", ["crafting_table"])

// Add the ingredient to the recipe
SkyrootPlanksSticksRecipe.addKey("P", AetherSkyrootPlanksItemType);

// Set the crafting pattern
SkyrootPlanksSticksRecipe.pattern = ["P", "P", ""];

// Define the resultant item to be produced by the recipe
SkyrootPlanksSticksRecipe.addResultant(new ItemStack(ItemType.get(ItemIdentifier.Stick)!, { stackSize: 4 }));

export { SkyrootPlanksSticksRecipe };