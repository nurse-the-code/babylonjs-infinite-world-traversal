import { FreeCamera, Scene, UniversalCamera, Vector3 } from "@babylonjs/core";
import Player from "../player/Player.ts";
import Vector, { Vector2D } from "../geometry/Vector.ts";

// Convert createCamera into a Camera interface and class

interface Camera {
  readonly camera: FreeCamera;
  readonly player: Player;
  set cameraPosition(position: Vector);
}

export class PlayerCamera implements Camera {
  readonly camera: FreeCamera;
  readonly player: Player;

  constructor(scene: Scene, canvas: HTMLCanvasElement, player: Player) {
    this.camera = new UniversalCamera(
      "camera1",
      new Vector3(
        player.currentPosition.x,
        player.eyeHeightInMeters,
        player.currentPosition.z,
      ),
      scene,
    );

    // Make the camera look down at the ground about 20 meters away.
    this.camera.setTarget(
      new Vector3(
        player.forwardVector.x,
        player.eyeHeightInMeters,
        player.forwardVector.z,
      ),
    );

    // Attach the camera to the canvas
    this.camera.attachControl(canvas, true);

    this.player = player;
  }

  set cameraPosition(position: Vector2D) {
    this.camera.position = new Vector3(
      position.x,
      this.player.eyeHeightInMeters,
      position.z,
    );
  }
}
export default Camera;
