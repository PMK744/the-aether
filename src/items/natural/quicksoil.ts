import { CustomItemType } from "@serenityjs/core";
import { CreativeItemCategory } from "@serenityjs/protocol";

import { AetherQuicksoilBlockType } from "../../blocks";

// Create a new custom item type for Quicksoil
const AetherQuicksoilItemType = new CustomItemType(AetherQuicksoilBlockType.identifier, { blockType: AetherQuicksoilBlockType });

// Set the display name for the item
AetherQuicksoilItemType.components.setDisplayName("Quicksoil");

// Assign the creative category and group for the item
AetherQuicksoilItemType.creativeCategory = CreativeItemCategory.Nature;
AetherQuicksoilItemType.creativeGroup = "Aether Natural";

export { AetherQuicksoilItemType };
