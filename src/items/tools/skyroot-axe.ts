import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

// Create a new custom item type for Aether Dirt
const AetherSkyrootAxeItemType = new CustomItemType("aether:skyroot_axe", { maxStackSize: 1 });

// Set the display name for the item
AetherSkyrootAxeItemType.components.setDisplayName("Skyroot Axe");

// Set the icon for the item
AetherSkyrootAxeItemType.components.setIcon({ default: "skyroot_axe" });

// Mark the item as hand-equipped
AetherSkyrootAxeItemType.components.setHandEquipped(true);

// Set the digger properties for the item
AetherSkyrootAxeItemType.components.setDigger({
  destroySpeeds: [
    {
      tags: ["wood"],
      speed: 1.65,
    }
  ]
});

// Set the durability for the item
AetherSkyrootAxeItemType.components.setDurability({
  max_durability: 60,
  damage_chance: {
    min: 1,
    max: 1
  }
})

// Set the damage for the item
AetherSkyrootAxeItemType.components.setDamage(3)

AetherSkyrootAxeItemType.setTags(["minecraft:wooden_tier", "minecraft:digger"]); // Set tags for the item

// Assign the creative category and group for the item
AetherSkyrootAxeItemType.creativeCategory = CreativeItemCategory.Equipment;
AetherSkyrootAxeItemType.creativeGroup = "itemGroup.name.axe";

export { AetherSkyrootAxeItemType };
