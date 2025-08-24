import { CustomBlockType, ItemDrop } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Aether Grass
const AetherSkyrootLogBlockType = new CustomBlockType("aether:skyroot_log", { solid: true });

const pillarAxisY = AetherSkyrootLogBlockType.createPermutation({ pillar_axis: "y" }); // Default permutation
const pillarAxisX = AetherSkyrootLogBlockType.createPermutation({ pillar_axis: "x" });
const pillarAxisZ = AetherSkyrootLogBlockType.createPermutation({ pillar_axis: "z" });

AetherSkyrootLogBlockType.components.setHardness(2); // Set hardness for the block

AetherSkyrootLogBlockType.addTag("minecraft:is_axe_item_destructible", "wood", "log") // Add tag for axe tier destructibility

// Set the geometry for the block
AetherSkyrootLogBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
pillarAxisY.components.setMaterialInstances({
  "up": {
    texture: "skyroot_log_top",
    render_method: MaterialRenderMethod.Opaque,
  },
  "north": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "south": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "west": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "east": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "down": {
    texture: "skyroot_log_top",
    render_method: MaterialRenderMethod.Opaque,
  }
})

pillarAxisZ.components.setMaterialInstances({
  "up": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "north": {
    texture: "skyroot_log_top",
    render_method: MaterialRenderMethod.Opaque,
  },
  "south": {
    texture: "skyroot_log_top",
    render_method: MaterialRenderMethod.Opaque,
  },
  "west": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "east": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "down": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  }
});

pillarAxisX.components.setMaterialInstances({
  "up": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "north": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "south": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  },
  "west": {
    texture: "skyroot_log_top",
    render_method: MaterialRenderMethod.Opaque,
  },
  "east": {
    texture: "skyroot_log_top",
    render_method: MaterialRenderMethod.Opaque,
  },
  "down": {
    texture: "skyroot_log_side",
    render_method: MaterialRenderMethod.Opaque,
  }
});

// Create an item drop for the block
const loot = new ItemDrop(AetherSkyrootLogBlockType.identifier, 1, 1, 1);
AetherSkyrootLogBlockType.drops.push(loot); // Add the item drop to the block

export { AetherSkyrootLogBlockType };
