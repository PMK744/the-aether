import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherGravititeOreBlockType } from "../../blocks";

// Create a new custom item type for GravititeOre
const AetherGravititeOreItemType = new CustomItemType(AetherGravititeOreBlockType.identifier, { blockType: AetherGravititeOreBlockType });

// Set the display name for the item
AetherGravititeOreItemType.components.setDisplayName("Gravitite Ore");

// Assign the creative category and group for the item
AetherGravititeOreItemType.creativeCategory = CreativeItemCategory.Nature;
AetherGravititeOreItemType.creativeGroup = "Aether Natural";

export { AetherGravititeOreItemType };
