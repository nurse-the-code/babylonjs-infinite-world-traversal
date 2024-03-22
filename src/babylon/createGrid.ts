import { CreateGround, GroundMesh, Material, Scene } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

const createMaterial = (scene: Scene): Material => {
  return new GridMaterial("grid", scene);
};

const createGrid = (scene: Scene): GroundMesh => {
  const grid: GroundMesh = CreateGround("ground1", {
    height: 64,
    width: 64,
    subdivisions: 2,
  });
  grid.material = createMaterial(scene);

  return grid;
};

export default createGrid;
