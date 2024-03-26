import MainCanvas from "./dom-components/Canvas.ts";
import { SimpleBabylonScene } from "./babylon";

document.addEventListener("DOMContentLoaded", () => {
  const canvasComponent: HTMLCanvasElement = MainCanvas.create();
  document.body.appendChild(canvasComponent);

  const simpleScene: SimpleBabylonScene = new SimpleBabylonScene(
    canvasComponent,
  );

  simpleScene.renderLoop();
});
