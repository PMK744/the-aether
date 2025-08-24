import { ConstructionItemTypes } from "./construction";
import { NaturalItemTypes } from "./natural";
import { ToolItemTypes } from "./tools";

const ItemTypes = [
  ...NaturalItemTypes,
  ...ConstructionItemTypes,
  ...ToolItemTypes
]

export { ItemTypes };

export * from "./natural";
export * from "./construction";
export * from "./tools";
