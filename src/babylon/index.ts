import * as BABYLON from "@babylonjs/core";
import Camera, { PlayerCamera } from "./Camera.ts";
import createLight from "./createLight.ts";
import createGrid from "./createGrid.ts";
import Player, { DemoPlayer } from "../player/Player.ts";

interface Scene {
  canvas: HTMLCanvasElement;
  player: Player;
  renderLoop(): void;
}

export class SimpleBabylonScene implements Scene {
  canvas: HTMLCanvasElement;
  player: Player;
  camera: Camera;
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;

  constructor(canvas: HTMLCanvasElement) {
    // Find the canvas element by its ID
    this.canvas = canvas;

    // Create a new player object
    this.player = new DemoPlayer();

    // Initialize the Babylon engine with the canvas
    this.engine = new BABYLON.Engine(this.canvas, true);

    // Create the scene
    this.scene = new BABYLON.Scene(this.engine);

    // Add the player camera to the scene
    this.camera = new PlayerCamera(this.scene, this.canvas, this.player);

    createLight(this.scene);

    createGrid(this.scene);
  }

  renderLoop(): void {
    // Run the render loop to continuously render the scene
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    // Resize the engine on window resize
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }
}

export default Scene;
