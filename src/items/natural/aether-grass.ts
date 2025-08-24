import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherGrassBlockType } from "../../blocks";

// Create a new custom item type for Aether Grass
const AetherGrassItemType = new CustomItemType(AetherGrassBlockType.identifier, { blockType: AetherGrassBlockType });

// Set the display name for the item
AetherGrassItemType.components.setDisplayName("Aether Grass Block");

// Assign the creative category and group for the item
AetherGrassItemType.creativeCategory = CreativeItemCategory.Nature;
AetherGrassItemType.creativeGroup = "Aether Natural";

export { AetherGrassItemType };
