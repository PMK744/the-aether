import { ItemIdentifier, ItemStack, ItemType, ShapedCraftingRecipe } from "@serenityjs/core";

import { AetherSkyrootShovelItemType, AetherSkyrootPlanksItemType } from "../../items";

// Create a new shapeless crafting recipe
const SkyrootShovelRecipe = new ShapedCraftingRecipe("aether_c:skyroot", ["crafting_table"])

// Add the ingredient to the recipe
SkyrootShovelRecipe.addKey("P", AetherSkyrootPlanksItemType);
SkyrootShovelRecipe.addKey("S", ItemType.get(ItemIdentifier.Stick)!);

// Set the crafting pattern
SkyrootShovelRecipe.pattern = ["P", "S", "S"];

// Define the resultant item to be produced by the recipe
SkyrootShovelRecipe.addResultant(new ItemStack(AetherSkyrootShovelItemType));

export { SkyrootShovelRecipe };