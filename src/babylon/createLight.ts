import { HemisphericLight, Light, Scene, Vector3 } from "@babylonjs/core";

const createLight = (scene: Scene): Light => {
  // Creates a HemisphericLight simulating ambient light with reflection direction upwards (0,1,0), no shadows
  const light: Light = new HemisphericLight(
    "light1",
    new Vector3(0, 1, 0),
    scene,
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  return light;
};

export default createLight;
