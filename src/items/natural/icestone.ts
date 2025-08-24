import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherIcestoneBlockType } from "../../blocks";

// Create a new custom item type for Icestone
const AetherIcestoneItemType = new CustomItemType(AetherIcestoneBlockType.identifier, { blockType: AetherIcestoneBlockType });

// Set the display name for the item
AetherIcestoneItemType.components.setDisplayName("Icestone");

// Assign the creative category and group for the item
AetherIcestoneItemType.creativeCategory = CreativeItemCategory.Nature;
AetherIcestoneItemType.creativeGroup = "Aether Natural";

export { AetherIcestoneItemType };
