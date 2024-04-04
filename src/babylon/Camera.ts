import * as Babylon from "./imports.ts";
import Player from "../player/Player.ts";
import Coordinate from "../geometry/Coordinate.ts";
import Vector, { Vector2D } from "../geometry/Vector.ts";

interface Camera {
  readonly camera: Babylon.FreeCamera;
  readonly player: Player;
  set position(position: Coordinate);
  get forwardRayDirection(): Vector;
}

export class PlayerCamera implements Camera {
  readonly camera: Babylon.FreeCamera;
  readonly player: Player;

  constructor(scene: Babylon.Scene, canvas: HTMLCanvasElement, player: Player) {
    this.camera = new Babylon.UniversalCamera(
      "camera1",
      new Babylon.Vector3(
        player.currentPosition.x,
        player.eyeHeightInMeters,
        player.currentPosition.z,
      ),
      scene,
    );

    // Make the camera look down at the ground about 20 meters away.
    this.camera.setTarget(
      new Babylon.Vector3(
        player.forwardVector.x,
        player.eyeHeightInMeters,
        player.forwardVector.z,
      ),
    );

    // Attach the camera to the canvas
    this.camera.attachControl(canvas, true);

    // remove all instances of keyboard (so we can customize keyboard UI/UX)
    this.camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

    this.player = player;
  }

  set position(position: Coordinate) {
    this.camera.position = new Babylon.Vector3(
      position.x,
      this.player.eyeHeightInMeters,
      position.z,
    );
  }

  get forwardRayDirection() {
    console.log(this.camera.getForwardRay().direction);
    const { x, z } = this.camera.getForwardRay().direction;
    return new Vector2D(x, z);
  }
}
export default Camera;
