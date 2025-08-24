import { ItemIdentifier, ItemStack, ItemType, ShapedCraftingRecipe } from "@serenityjs/core";

import { AetherSkyrootSwordItemType, AetherSkyrootPlanksItemType } from "../../items";

// Create a new shapeless crafting recipe
const SkyrootSwordRecipe = new ShapedCraftingRecipe("aether_c:skyroot_sword", ["crafting_table"])

// Add the ingredient to the recipe
SkyrootSwordRecipe.addKey("P", AetherSkyrootPlanksItemType);
SkyrootSwordRecipe.addKey("S", ItemType.get(ItemIdentifier.Stick)!);

// Set the crafting pattern
SkyrootSwordRecipe.pattern = ["P", "P", "S"];

// Define the resultant item to be produced by the recipe
SkyrootSwordRecipe.addResultant(new ItemStack(AetherSkyrootSwordItemType));

export { SkyrootSwordRecipe };