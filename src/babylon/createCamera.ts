import { FreeCamera, Scene, UniversalCamera, Vector3 } from "@babylonjs/core";
import Player, { DemoPlayer } from "../player/Player.ts";

const player: Player = new DemoPlayer();

const createCamera = (scene: Scene, canvas: HTMLCanvasElement): FreeCamera => {
  // Create a position a free camera (non-mesh)
  const camera: FreeCamera = new UniversalCamera(
    "camera1",
    new Vector3(
      player.currentPosition.x,
      player.eyeHeightInMeters,
      player.currentPosition.z,
    ),
    scene,
  );

  // Make the camera look down at the ground about 20 meters away.
  camera.setTarget(
    new Vector3(
      player.currentPosition.x + 20,
      player.eyeHeightInMeters,
      player.currentPosition.z + 20,
    ),
  );

  // Attach the camera to the canvas
  camera.attachControl(canvas, true);

  return camera;
};

export default createCamera;
