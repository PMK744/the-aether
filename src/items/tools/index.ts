import { AetherSkyrootAxeItemType } from "./skyroot-axe";
import { AetherSkyrootHoeItemType } from "./skyroot-hoe";
import { AetherSkyrootPickaxeItemType } from "./skyroot-pickaxe";
import { AetherSkyrootShovelItemType } from "./skyroot-shovel";
import { AetherSkyrootSwordItemType } from "./skyroot-sword";

const ToolItemTypes = [
  AetherSkyrootPickaxeItemType,
  AetherSkyrootAxeItemType,
  AetherSkyrootShovelItemType,
  AetherSkyrootSwordItemType,
  AetherSkyrootHoeItemType
]

export { ToolItemTypes };

export * from "./skyroot-pickaxe";
export * from "./skyroot-axe";
export * from "./skyroot-shovel";
export * from "./skyroot-sword";
export * from "./skyroot-hoe";