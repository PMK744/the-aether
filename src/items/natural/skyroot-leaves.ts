import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherSkyrootLeavesBlockType } from "../../blocks";

// Create a new custom item type for Skyroot Leaves
const AetherSkyrootLeavesItemType = new CustomItemType(AetherSkyrootLeavesBlockType.identifier, { blockType: AetherSkyrootLeavesBlockType });

// Set the display name for the item
AetherSkyrootLeavesItemType.components.setDisplayName("Skyroot Leaves");

// Assign the creative category and group for the item
AetherSkyrootLeavesItemType.creativeCategory = CreativeItemCategory.Nature;
AetherSkyrootLeavesItemType.creativeGroup = "Aether Natural";

export { AetherSkyrootLeavesItemType };
