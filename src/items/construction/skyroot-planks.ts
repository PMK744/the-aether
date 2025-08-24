import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherSkyrootPlanksBlockType } from "../../blocks";

// Create a new custom item type for Aether Dirt
const AetherSkyrootPlanksItemType = new CustomItemType(AetherSkyrootPlanksBlockType.identifier, { blockType: AetherSkyrootPlanksBlockType });

// Set the display name for the item
AetherSkyrootPlanksItemType.components.setDisplayName("Skyroot Planks");

// Assign the creative category and group for the item
AetherSkyrootPlanksItemType.creativeCategory = CreativeItemCategory.Construction;
AetherSkyrootPlanksItemType.creativeGroup = "Aether Construction";

export { AetherSkyrootPlanksItemType };
