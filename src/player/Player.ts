import Coordinate, { Coordinate2D } from "../geometry/Coordinate.ts";
import Vector, { Vector2D } from "../geometry/Vector.ts";

// According to the infallible ChatGPT
const AVERAGE_EYE_HEIGHT_METERS: number = 1.57;

interface Player {
  currentPosition: Coordinate;
  forwardVector: Vector;
  readonly eyeHeightInMeters: number;
}

export class DemoPlayer implements Player {
  currentPosition: Coordinate;
  forwardVector: Vector;
  readonly eyeHeightInMeters: number = AVERAGE_EYE_HEIGHT_METERS;

  constructor(
    coordinate: Coordinate = new Coordinate2D(0, 0),
    forwardVector: Vector = new Vector2D(20, 20),
  ) {
    this.currentPosition = coordinate;
    this.forwardVector = forwardVector;
  }
}

export default Player;
