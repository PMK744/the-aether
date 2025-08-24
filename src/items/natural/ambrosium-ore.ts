import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherAmbrosiumOreBlockType } from "../../blocks";

// Create a new custom item type for AmbrosiumOre
const AetherAmbrosiumOreItemType = new CustomItemType(AetherAmbrosiumOreBlockType.identifier, { blockType: AetherAmbrosiumOreBlockType });

// Set the display name for the item
AetherAmbrosiumOreItemType.components.setDisplayName("Ambrosium Ore");

// Assign the creative category and group for the item
AetherAmbrosiumOreItemType.creativeCategory = CreativeItemCategory.Nature;
AetherAmbrosiumOreItemType.creativeGroup = "Aether Natural";

export { AetherAmbrosiumOreItemType };
