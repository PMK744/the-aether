import { ItemIdentifier, ItemStack, ItemType, ShapedCraftingRecipe } from "@serenityjs/core";

import { AetherSkyrootHoeItemType, AetherSkyrootPlanksItemType } from "../../items";

// Create a new shapeless crafting recipe
const SkyrootHoeRecipe = new ShapedCraftingRecipe("aether_c:skyroot_hoe", ["crafting_table"])

// Add the ingredient to the recipe
SkyrootHoeRecipe.addKey("P", AetherSkyrootPlanksItemType);
SkyrootHoeRecipe.addKey("S", ItemType.get(ItemIdentifier.Stick)!);

// Set the crafting pattern
SkyrootHoeRecipe.pattern = ["PP", " S", " S"];

// Define the resultant item to be produced by the recipe
SkyrootHoeRecipe.addResultant(new ItemStack(AetherSkyrootHoeItemType));

export { SkyrootHoeRecipe };