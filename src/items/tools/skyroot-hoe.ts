import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

// Create a new custom item type for Aether Dirt
const AetherSkyrootHoeItemType = new CustomItemType("aether:skyroot_hoe", { maxStackSize: 1 });

// Set the display name for the item
AetherSkyrootHoeItemType.components.setDisplayName("Skyroot Hoe");

// Set the icon for the item
AetherSkyrootHoeItemType.components.setIcon({ default: "skyroot_hoe" });

// Mark the item as hand-equipped
AetherSkyrootHoeItemType.components.setHandEquipped(true);

// Set the durability for the item
AetherSkyrootHoeItemType.components.setDurability({
  max_durability: 60,
  damage_chance: {
    min: 1,
    max: 1
  }
})

AetherSkyrootHoeItemType.setTags(["minecraft:wooden_tier"]); // Set tags for the item

// Assign the creative category and group for the item
AetherSkyrootHoeItemType.creativeCategory = CreativeItemCategory.Equipment;
AetherSkyrootHoeItemType.creativeGroup = "itemGroup.name.hoe";

export { AetherSkyrootHoeItemType };
