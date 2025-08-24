import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherPurpleFlowerBlockType } from "../../blocks";

// Create a new custom item type for Quicksoil
const AetherPurpleFlowerItemType = new CustomItemType(AetherPurpleFlowerBlockType.identifier, { blockType: AetherPurpleFlowerBlockType });

// Set the display name for the item
AetherPurpleFlowerItemType.components.setDisplayName("Purple Flower");

// Assign the creative category and group for the item
AetherPurpleFlowerItemType.creativeCategory = CreativeItemCategory.Nature;
AetherPurpleFlowerItemType.creativeGroup = "Aether Natural";

export { AetherPurpleFlowerItemType };
