import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherDirtBlockType } from "../../blocks";

// Create a new custom item type for Aether Dirt
const AetherDirtItemType = new CustomItemType(AetherDirtBlockType.identifier, { blockType: AetherDirtBlockType });

// Set the display name for the item
AetherDirtItemType.components.setDisplayName("Aether Dirt");

// Assign the creative category and group for the item
AetherDirtItemType.creativeCategory = CreativeItemCategory.Nature;
AetherDirtItemType.creativeGroup = "Aether Natural";

export { AetherDirtItemType };
