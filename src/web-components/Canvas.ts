const createCanvas = () => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  // apply styles to the canvas element
  Object.assign(canvas.style, {
    width: "100%",
    height: "100%",
    padding: "0",
    margin: "0",
    border: "20",
    touchAction: "none",
  });
  canvas.id = "renderCanvas";
  document.body.appendChild(canvas);
  return canvas;
};

export default createCanvas;
