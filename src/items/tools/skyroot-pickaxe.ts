import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

// Create a new custom item type for Aether Dirt
const AetherSkyrootPickaxeItemType = new CustomItemType("aether:skyroot_pickaxe", { maxStackSize: 1 });

// Set the display name for the item
AetherSkyrootPickaxeItemType.components.setDisplayName("Skyroot Pickaxe");

// Set the icon for the item
AetherSkyrootPickaxeItemType.components.setIcon({ default: "skyroot_pickaxe" });

// Mark the item as hand-equipped
AetherSkyrootPickaxeItemType.components.setHandEquipped(true);

// Set the digger properties for the item
AetherSkyrootPickaxeItemType.components.setDigger({
  destroySpeeds: [
    {
      tags: ["stone"],
      speed: 1.65,
    }
  ]
});

// Set the durability for the item
AetherSkyrootPickaxeItemType.components.setDurability({
  max_durability: 60,
  damage_chance: {
    min: 1,
    max: 1
  }
})

AetherSkyrootPickaxeItemType.setTags(["minecraft:wooden_tier", "minecraft:digger"]); // Set tags for the item

// Assign the creative category and group for the item
AetherSkyrootPickaxeItemType.creativeCategory = CreativeItemCategory.Equipment;
AetherSkyrootPickaxeItemType.creativeGroup = "itemGroup.name.pickaxe";

export { AetherSkyrootPickaxeItemType };
