# The Aether

> Disclaimer: This plugin is not affiliated with Mojang or the original Aether mod in any way. Please visit [https://www.curseforge.com/minecraft/mc-mods/aether](https://www.curseforge.com/minecraft/mc-mods/aether) for the original mod.

> This plugin is still in early development. Expect bugs and incomplete features including items, blocks, and mobs.

The plugins is a basic recreation of the popular Minecraft Java Edition mod, The Aether, but for Minecraft Bedrock Edition. It adds a new dimension, the Aether, which is a sky-themed world filled with new blocks, items, and mobs.

## Features
- **New Dimension**: The Aether, a sky-themed world with floating islands and unique terrain.
- **New Blocks**: Including holystone, skyroot wood, and zanite ore.

## Installation
1. Download the latest release from the releases tab.
2. Place the `.plugin` file into your server's `plugins` directory.
3. Restart your server to load the plugin.

## Generator Usage
To generate the Aether dimension, you must modify your world settings to include the Aether generator. This can done by modifying our world's `properties.jsib` file.

![Generator Demo]("https://github.com/PMK744/the-aether/blob/typescript/public/banner.png?raw=true")

```json
{
  "identifier": "default",
  "seed": 4125897965,
  "gamemode": "survival",
  "difficulty": "normal",
  "saveInterval": 5,
  "dimensions": [
    {
      "identifier": "overworld",
      "type": 0,
      "generator": "superflat",
      "viewDistance": 20,
      "simulationDistance": 10,
      "spawnPosition": [0, -60, 0]
    },
    {
      "identifier": "aether", // Dimension name
      "type": 0,
      "generator": "the-aether", // Generator name
      "viewDistance": 20,
      "simulationDistance": 10,
      "spawnPosition": [-120, 80, 330]
    }
  ],
  "gamerules": { /** Game Rules...  */ }
}
```