import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

// Create a new custom item type for Aether Dirt
const AetherSkyrootShovelItemType = new CustomItemType("aether:skyroot_shovel", { maxStackSize: 1 });

// Set the display name for the item
AetherSkyrootShovelItemType.components.setDisplayName("Skyroot Shovel");

// Set the icon for the item
AetherSkyrootShovelItemType.components.setIcon({ default: "skyroot_shovel" });

// Mark the item as hand-equipped
AetherSkyrootShovelItemType.components.setHandEquipped(true);

// Set the digger properties for the item
AetherSkyrootShovelItemType.components.setDigger({
  destroySpeeds: [
    {
      tags: ["dirt"],
      speed: 1.65,
    }
  ]
});

// Set the durability for the item
AetherSkyrootShovelItemType.components.setDurability({
  max_durability: 60,
  damage_chance: {
    min: 1,
    max: 1
  }
})

AetherSkyrootShovelItemType.setTags(["minecraft:wooden_tier", "minecraft:digger"]); // Set tags for the item

// Assign the creative category and group for the item
AetherSkyrootShovelItemType.creativeCategory = CreativeItemCategory.Equipment;
AetherSkyrootShovelItemType.creativeGroup = "itemGroup.name.shovel";

export { AetherSkyrootShovelItemType };
