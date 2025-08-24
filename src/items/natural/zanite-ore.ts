import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherZaniteOreBlockType } from "../../blocks";

// Create a new custom item type for ZaniteOre
const AetherZaniteOreItemType = new CustomItemType(AetherZaniteOreBlockType.identifier, { blockType: AetherZaniteOreBlockType });

// Set the display name for the item
AetherZaniteOreItemType.components.setDisplayName("Zanite Ore");

// Assign the creative category and group for the item
AetherZaniteOreItemType.creativeCategory = CreativeItemCategory.Nature;
AetherZaniteOreItemType.creativeGroup = "Aether Natural";

export { AetherZaniteOreItemType };
