import * as Babylon from "./imports.ts";
import Player, { DemoPlayer } from "../player/Player.ts";
import Camera, { PlayerCamera } from "./Camera.ts";
import ControlStrategy, {
  KeyboardControlStrategy,
} from "../player/ControlStrategy.ts";
import createLight from "./createLight.ts";
import createGrid from "./createGrid.ts";
import DebugOverlay from "../web-components/DebugOverlay.ts";

type RenderLoop = (
  canvas: HTMLCanvasElement,
  overlay: DebugOverlay,
) => () => void;

const Scene: RenderLoop = (
  canvas: HTMLCanvasElement,
  overlay: DebugOverlay,
) => {
  // Create a new player object
  const player: Player = new DemoPlayer();

  // Initialize the Babylon engine with the canvas
  const engine: Babylon.Engine = new Babylon.Engine(canvas, true);

  // Create the scene=
  const scene: Babylon.Scene = new Babylon.Scene(engine);

  // Add the player camera to the scene
  const camera: Camera = new PlayerCamera(scene, canvas, player);

  // Establish the control strategy for the player
  const controlStrategy: ControlStrategy = new KeyboardControlStrategy(player);

  createLight(scene);
  createGrid(scene);

  return (): void => {
    // Run the render loop to continuously render the scene
    engine.runRenderLoop((): void => {
      // Handle player input
      controlStrategy.handleInput();

      // Update the player's position
      camera.position = player.currentPosition;

      // Update the direction the player is facing
      player.forwardVector = camera.forwardRayDirection;

      // Update the overlay with the new player data
      overlay.updateData(
        player.currentPosition.x,
        player.currentPosition.z,
        player.forwardVector.x,
        player.forwardVector.z,
      );
      scene.render();
    });

    // Resize the engine on window resize
    window.addEventListener("resize", () => {
      engine.resize();
    });
  };
};

export default Scene;
