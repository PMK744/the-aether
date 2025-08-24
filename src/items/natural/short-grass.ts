import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherShortGrassBlockType } from "../../blocks";

// Create a new custom item type for Short Grass
const AetherShortGrassItemType = new CustomItemType(AetherShortGrassBlockType.identifier, { blockType: AetherShortGrassBlockType });

// Set the display name for the item
AetherShortGrassItemType.components.setDisplayName("Short Grass");

// Assign the creative category and group for the item
AetherShortGrassItemType.creativeCategory = CreativeItemCategory.Nature;
AetherShortGrassItemType.creativeGroup = "Aether Natural";

export { AetherShortGrassItemType };
