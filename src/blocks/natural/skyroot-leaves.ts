import { BlockMaterialSound, CustomBlockType } from "@serenityjs/core";
import { MaterialRenderMethod } from "@serenityjs/protocol";

// Create a new custom block type for Skyroot Leaves
const AetherSkyrootLeavesBlockType = new CustomBlockType("aether:skyroot_leaves", { solid: false });

AetherSkyrootLeavesBlockType.createPermutation({}); // Default permutation
AetherSkyrootLeavesBlockType.components.setHardness(0.2); // Set hardness for the block

AetherSkyrootLeavesBlockType.addTag("plant") // Add tag for plants

AetherSkyrootLeavesBlockType.components.setLightDampening(0)

AetherSkyrootLeavesBlockType.setMaterialSound(BlockMaterialSound.Sand);

// Set the geometry for the block
AetherSkyrootLeavesBlockType.components.setGeometry({
  identifier: "minecraft:geometry.full_block"
})

// Set the material instances for the block
AetherSkyrootLeavesBlockType.components.setMaterialInstances({
  "*": {
    texture: "skyroot_leaves",
    render_method: MaterialRenderMethod.AlphaTestSingleSided,
    ambient_occlusion: false,
    face_dimming: false
  }
})

export { AetherSkyrootLeavesBlockType };
