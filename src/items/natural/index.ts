import { AetherDirtItemType } from "./aether-dirt";
import { AetherGrassItemType } from "./aether-grass";
import { AetherAmbrosiumOreItemType } from "./ambrosium-ore";
import { AetherGravititeOreItemType } from "./gravitite-ore";
import { AetherHolystoneItemType } from "./holystone";
import { AetherIcestoneItemType } from "./icestone";
import { AetherPurpleFlowerItemType } from "./purple-flower";
import { AetherQuicksoilItemType } from "./quicksoil";
import { AetherShortGrassItemType } from "./short-grass";
import { AetherSkyrootLeavesItemType } from "./skyroot-leaves";
import { AetherSkyrootLogItemType } from "./skyroot-log";
import { AetherWhiteFlowerItemType } from "./white-flower";
import { AetherZaniteOreItemType } from "./zanite-ore";

const NaturalItemTypes = [
  AetherDirtItemType,
  AetherGrassItemType,
  AetherHolystoneItemType,
  AetherQuicksoilItemType,
  AetherSkyrootLogItemType,
  AetherSkyrootLeavesItemType,
  AetherPurpleFlowerItemType,
  AetherWhiteFlowerItemType,
  AetherShortGrassItemType,
  AetherIcestoneItemType,
  AetherAmbrosiumOreItemType,
  AetherZaniteOreItemType,
  AetherGravititeOreItemType
]

export { NaturalItemTypes };

export * from "./aether-dirt";
export * from "./aether-grass";
export * from "./holystone";
export * from "./quicksoil";
export * from "./skyroot-log";
export * from "./skyroot-leaves";
export * from "./purple-flower";
export * from "./white-flower";
export * from "./short-grass";
export * from "./icestone";
export * from "./ambrosium-ore";
export * from "./zanite-ore";
export * from "./gravitite-ore";
