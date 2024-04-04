import * as Babylon from "./imports.ts";

const createLight = (scene: Babylon.Scene): Babylon.Light => {
  // Creates a HemisphericLight simulating ambient light with reflection direction upwards (0,1,0), no shadows
  const light: Babylon.Light = new Babylon.HemisphericLight(
    "light1",
    new Babylon.Vector3(0, 1, 0),
    scene,
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  return light;
};

export default createLight;
