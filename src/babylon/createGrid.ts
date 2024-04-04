import * as Babylon from "./imports.ts";
import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

const createMaterial = (scene: Babylon.Scene): Babylon.Material => {
  const material = new GridMaterial("grid", scene);

  // Grid configuration (1 unit is scaled to 1 meter)
  material.majorUnitFrequency = 16; // Major grid lines every 16 minor lines
  material.minorUnitVisibility = 0.2; // Opacity of minor grid lines
  material.gridRatio = 0.0625; // Minor lines per 1 unit, inspired by Minecraft

  return material;
};

const createGrid = (scene: Babylon.Scene): Babylon.GroundMesh => {
  const grid: Babylon.GroundMesh = Babylon.CreateGround("ground1", {
    height: Number.MAX_SAFE_INTEGER,
    width: Number.MAX_SAFE_INTEGER,
    subdivisions: 2,
  });
  grid.material = createMaterial(scene);

  return grid;
};

export default createGrid;
