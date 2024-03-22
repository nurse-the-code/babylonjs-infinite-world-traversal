import * as BABYLON from "@babylonjs/core";
import createCamera from "./createCamera.ts";
import createLight from "./createLight.ts";
import createGrid from "./createGrid.ts";

interface Scene {
  canvas: HTMLCanvasElement;
  renderLoop(): void;
}

export class SimpleBabylonScene implements Scene {
  canvas: HTMLCanvasElement;
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;

  constructor(canvas: HTMLCanvasElement) {
    // Find the canvas element by its ID
    this.canvas = canvas;

    // Initialize the Babylon engine with the canvas
    this.engine = new BABYLON.Engine(this.canvas, true);

    // Create the scene
    this.scene = new BABYLON.Scene(this.engine);

    // Add basic elements to the scene (like camera, light, and a simple mesh)
    this.setupScene();
  }

  setupScene(): void {
    createCamera(this.scene, this.canvas);
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
