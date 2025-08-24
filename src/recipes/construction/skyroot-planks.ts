import { ItemStack, ShapelessCraftingRecipe } from "@serenityjs/core";

import { AetherSkyrootLogItemType, AetherSkyrootPlanksItemType } from "../../items";

// Create a new shapeless crafting recipe
const SkyrootPlanksRecipe = new ShapelessCraftingRecipe("aether_c:skyroot_planks", ["crafting_table"])

// Add the ingredient to the recipe
SkyrootPlanksRecipe.addIngredient(AetherSkyrootLogItemType);

// Define the resultant item to be produced by the recipe
SkyrootPlanksRecipe.addResultant(new ItemStack(AetherSkyrootPlanksItemType, { stackSize: 4 }));

export { SkyrootPlanksRecipe };