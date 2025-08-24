import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherWhiteFlowerBlockType } from "../../blocks";

// Create a new custom item type for Quicksoil
const AetherWhiteFlowerItemType = new CustomItemType(AetherWhiteFlowerBlockType.identifier, { blockType: AetherWhiteFlowerBlockType });

// Set the display name for the item
AetherWhiteFlowerItemType.components.setDisplayName("White Flower");

// Assign the creative category and group for the item
AetherWhiteFlowerItemType.creativeCategory = CreativeItemCategory.Nature;
AetherWhiteFlowerItemType.creativeGroup = "Aether Natural";

export { AetherWhiteFlowerItemType };
