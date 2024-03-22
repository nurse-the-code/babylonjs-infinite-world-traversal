import { FreeCamera, Scene, TargetCamera, Vector3 } from "@babylonjs/core";

const createCamera = (
  scene: Scene,
  canvas: HTMLCanvasElement,
): TargetCamera => {
  // Create a position a free camera (non-mesh)
  const camera: TargetCamera = new FreeCamera(
    "camera1",
    new Vector3(0, 5, -10),
    scene,
  );

  // Make the camera look at the scene origin
  camera.setTarget(Vector3.Zero());

  // Attach the camera to the canvas
  camera.attachControl(canvas, true);

  return camera;
};

export default createCamera;
