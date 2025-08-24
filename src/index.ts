import { Plugin, type PluginEvents } from "@serenityjs/plugins";

import "./worker";

import { AetherIslandsGenerator } from "./generator";
import { WorldInitializeSignal } from "@serenityjs/core";


import { BlockTypes } from "./blocks";
import { ItemTypes } from "./items";
import { Recipes } from "./recipes";

class AetherPlugin extends Plugin implements PluginEvents {
  public constructor() {
    super("aether-plugin", "0.1.0");
  }

  public override onInitialize(): void {
    this.serenity.registerGenerator(AetherIslandsGenerator);
  }

  // Listen to world initialization events
  public onWorldInitialize({ world }: WorldInitializeSignal): void {
    // Register the custom block types
    for (const type of BlockTypes) world.blockPalette.registerType(type);

    // Register the custom item types
    for (const type of ItemTypes) world.itemPalette.registerType(type);

    // Register the custom recipes
    for (const recipe of Recipes) world.itemPalette.registerRecipe(recipe);
  }
}

export default new AetherPlugin();
