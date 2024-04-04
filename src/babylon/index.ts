import * as Babylon from "./imports.ts";
import Camera, { PlayerCamera } from "./Camera.ts";
import createLight from "./createLight.ts";
import createGrid from "./createGrid.ts";
import Player, { DemoPlayer } from "../player/Player.ts";
import ControlStrategy, {
  KeyboardControlStrategy,
} from "../player/ControlStrategy.ts";

interface Scene {
  canvas: HTMLCanvasElement;
  renderLoop(): void;
}

export class SimpleBabylonScene implements Scene {
  canvas: HTMLCanvasElement;
  player: Player;
  controlStrategy: ControlStrategy;
  camera: Camera;
  engine: Babylon.Engine;
  scene: Babylon.Scene;

  constructor(canvas: HTMLCanvasElement) {
    // Find the canvas element by its ID
    this.canvas = canvas;

    // Create a new player object
    this.player = new DemoPlayer();

    // Initialize the Babylon engine with the canvas
    this.engine = new Babylon.Engine(this.canvas, true);

    // Create the scene
    this.scene = new Babylon.Scene(this.engine);

    // Add the player camera to the scene
    this.camera = new PlayerCamera(this.scene, this.canvas, this.player);

    this.controlStrategy = new KeyboardControlStrategy(this.player);

    createLight(this.scene);

    createGrid(this.scene);
  }

  renderLoop(): void {
    // Run the render loop to continuously render the scene
    this.engine.runRenderLoop(() => {
      this.controlStrategy.handleInput();
      this.camera.position = this.player.currentPosition;
      // update the direction the player is facing
      this.player.forwardVector = this.camera.forwardRayDirection;
      this.scene.render();
    });

    // Resize the engine on window resize
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }
}

export default Scene;
