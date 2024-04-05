import "./web-components";
import createCanvas from "./web-components/Canvas.ts";
import DebugOverlay, { createOverlay } from "./web-components/DebugOverlay.ts";
import Scene from "./babylon";

document.addEventListener("DOMContentLoaded", () => {
  const canvas: HTMLCanvasElement = createCanvas();
  const overlay: DebugOverlay = createOverlay();

  const renderLoop = Scene(canvas, overlay);

  renderLoop();
});
