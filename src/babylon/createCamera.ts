import { FreeCamera, Scene, UniversalCamera, Vector3 } from "@babylonjs/core";

// According to the infallible ChatGPT
const AVERAGE_EYE_HEIGHT_METERS: number = 1.57;

const createCamera = (scene: Scene, canvas: HTMLCanvasElement): FreeCamera => {
  // Create a position a free camera (non-mesh)
  const camera: FreeCamera = new UniversalCamera(
    "camera1",
    new Vector3(0, AVERAGE_EYE_HEIGHT_METERS, 0),
    scene,
  );

  // Make the camera look down at the ground about 20 meters away.
  camera.setTarget(new Vector3(20, 0, 0));

  // Attach the camera to the canvas
  camera.attachControl(canvas, true);

  return camera;
};

export default createCamera;
