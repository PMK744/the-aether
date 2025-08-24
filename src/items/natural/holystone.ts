import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherHolystoneBlockType } from "../../blocks";

// Create a new custom item type for Holystone
const AetherHolystoneItemType = new CustomItemType(AetherHolystoneBlockType.identifier, { blockType: AetherHolystoneBlockType });

// Set the display name for the item
AetherHolystoneItemType.components.setDisplayName("Holystone");

// Assign the creative category and group for the item
AetherHolystoneItemType.creativeCategory = CreativeItemCategory.Nature;
AetherHolystoneItemType.creativeGroup = "Aether Natural";

export { AetherHolystoneItemType };
