import { ItemIdentifier, ItemStack, ItemType, ShapedCraftingRecipe } from "@serenityjs/core";

import { AetherSkyrootAxeItemType, AetherSkyrootPlanksItemType } from "../../items";

// Create a new shapeless crafting recipe
const SkyrootAxeRecipe = new ShapedCraftingRecipe("aether_c:skyroot_axe", ["crafting_table"])

// Add the ingredient to the recipe
SkyrootAxeRecipe.addKey("P", AetherSkyrootPlanksItemType);
SkyrootAxeRecipe.addKey("S", ItemType.get(ItemIdentifier.Stick)!);

// Set the crafting pattern
SkyrootAxeRecipe.pattern = ["PP", "PS", " S"];

// Define the resultant item to be produced by the recipe
SkyrootAxeRecipe.addResultant(new ItemStack(AetherSkyrootAxeItemType));

export { SkyrootAxeRecipe };