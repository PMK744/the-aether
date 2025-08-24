import { AetherDirtBlockType } from "./aether-dirt";
import { AetherGrassBlockType } from "./aether-grass";
import { AetherAmbrosiumOreBlockType } from "./ambrosium-ore";
import { AetherGravititeOreBlockType } from "./gravitite-ore";
import { AetherHolystoneBlockType } from "./holystone";
import { AetherIcestoneBlockType } from "./icestone";
import { AetherPurpleFlowerBlockType } from "./purple-flower";
import { AetherQuicksoilBlockType } from "./quicksoil";
import { AetherShortGrassBlockType } from "./short-grass";
import { AetherSkyrootLeavesBlockType } from "./skyroot-leaves";
import { AetherSkyrootLogBlockType } from "./skyroot-log";
import { AetherWhiteFlowerBlockType } from "./white-flower";
import { AetherZaniteOreBlockType } from "./zanite-ore";

const NaturalBlockTypes = [
  AetherDirtBlockType,
  AetherGrassBlockType,
  AetherHolystoneBlockType,
  AetherQuicksoilBlockType,
  AetherSkyrootLogBlockType,
  AetherPurpleFlowerBlockType,
  AetherWhiteFlowerBlockType,
  AetherShortGrassBlockType,
  AetherSkyrootLeavesBlockType,
  AetherIcestoneBlockType,
  AetherAmbrosiumOreBlockType,
  AetherZaniteOreBlockType,
  AetherGravititeOreBlockType
]

export { NaturalBlockTypes };

export * from "./aether-dirt";
export * from "./aether-grass";
export * from "./holystone";
export * from "./quicksoil";
export * from "./skyroot-log";
export * from "./purple-flower";
export * from "./white-flower";
export * from "./short-grass";
export * from "./skyroot-leaves";
export * from "./icestone";
export * from "./ambrosium-ore";
export * from "./zanite-ore";
export * from "./gravitite-ore";
