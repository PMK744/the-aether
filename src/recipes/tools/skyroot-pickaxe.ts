import { ItemIdentifier, ItemStack, ItemType, ShapedCraftingRecipe } from "@serenityjs/core";

import { AetherSkyrootPickaxeItemType, AetherSkyrootPlanksItemType } from "../../items";

// Create a new shapeless crafting recipe
const SkyrootPickaxeRecipe = new ShapedCraftingRecipe("aether_c:skyroot_pickaxe", ["crafting_table"])

// Add the ingredient to the recipe
SkyrootPickaxeRecipe.addKey("P", AetherSkyrootPlanksItemType);
SkyrootPickaxeRecipe.addKey("S", ItemType.get(ItemIdentifier.Stick)!);

// Set the crafting pattern
SkyrootPickaxeRecipe.pattern = ["PPP", " S ", " S "];

// Define the resultant item to be produced by the recipe
SkyrootPickaxeRecipe.addResultant(new ItemStack(AetherSkyrootPickaxeItemType));

export { SkyrootPickaxeRecipe };