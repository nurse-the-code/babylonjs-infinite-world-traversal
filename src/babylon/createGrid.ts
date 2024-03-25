import { CreateGround, GroundMesh, Material, Scene } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

const createMaterial = (scene: Scene): Material => {
  const material = new GridMaterial("grid", scene);

  // Grid configuration (1 unit is scaled to 1 meter)
  material.majorUnitFrequency = 16; // Major grid lines every 16 minor lines
  material.minorUnitVisibility = 0.2; // Opacity of minor grid lines
  material.gridRatio = 0.0625; // Minor lines per 1 unit, inspired by Minecraft

  return material;
};

const createGrid = (scene: Scene): GroundMesh => {
  const grid: GroundMesh = CreateGround("ground1", {
    height: 32,
    width: 32,
    subdivisions: 2,
  });
  grid.material = createMaterial(scene);

  return grid;
};

export default createGrid;
