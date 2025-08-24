import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

// Create a new custom item type for Aether Dirt
const AetherSkyrootSwordItemType = new CustomItemType("aether:skyroot_sword", { maxStackSize: 1 });

// Set the display name for the item
AetherSkyrootSwordItemType.components.setDisplayName("Skyroot Sword");

// Set the icon for the item
AetherSkyrootSwordItemType.components.setIcon({ default: "skyroot_sword" });

// Mark the item as hand-equipped
AetherSkyrootSwordItemType.components.setHandEquipped(true);

// Set the durability for the item
AetherSkyrootSwordItemType.components.setDurability({
  max_durability: 60,
  damage_chance: {
    min: 1,
    max: 1
  }
})

// Set the damage for the item
AetherSkyrootSwordItemType.components.setDamage(4);

AetherSkyrootSwordItemType.setTags(["minecraft:wooden_tier"]); // Set tags for the item

// Assign the creative category and group for the item
AetherSkyrootSwordItemType.creativeCategory = CreativeItemCategory.Equipment;
AetherSkyrootSwordItemType.creativeGroup = "itemGroup.name.sword";

export { AetherSkyrootSwordItemType };
