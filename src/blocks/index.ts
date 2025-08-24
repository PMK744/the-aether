import { ConstructionBlockTypes } from "./construction";
import { NaturalBlockTypes } from "./natural";

const BlockTypes = [
  ...NaturalBlockTypes,
  ...ConstructionBlockTypes
];

export { BlockTypes };

export * from "./natural";
export * from "./construction";
