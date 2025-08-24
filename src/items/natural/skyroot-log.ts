import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherSkyrootLogBlockType } from "../../blocks";

// Create a new custom item type for Aether Dirt
const AetherSkyrootLogItemType = new CustomItemType(AetherSkyrootLogBlockType.identifier, { blockType: AetherSkyrootLogBlockType });

// Set the display name for the item
AetherSkyrootLogItemType.components.setDisplayName("Skyroot Log");

// Assign the creative category and group for the item
AetherSkyrootLogItemType.creativeCategory = CreativeItemCategory.Nature;
AetherSkyrootLogItemType.creativeGroup = "Aether Natural";

export { AetherSkyrootLogItemType };
