import MainCanvas from "./dom-components/Canvas.ts";
import { SimpleBabylonScene } from "./babylon";

document.addEventListener("DOMContentLoaded", () => {
  const canvasComponent: HTMLCanvasElement = MainCanvas.create();
  document.body.appendChild(canvasComponent);
  // Further initialization of your Babylon.js scene can happen here
  const simpleScene = new SimpleBabylonScene(canvasComponent);
  simpleScene.renderLoop();
});
