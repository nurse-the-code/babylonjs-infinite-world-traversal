import Coordinate, { Coordinate2D } from "../geometry/Coordinate.ts";
import Vector, { Vector2D } from "../geometry/Vector.ts";

// According to the infallible ChatGPT
const AVERAGE_EYE_HEIGHT_METERS: number = 1.57;

interface Player {
  readonly currentPosition: Coordinate;
  forwardVector: Vector;
  move: (movementVector: Vector) => void;
  readonly speed: number;
  readonly eyeHeightInMeters: number;
}

export class DemoPlayer implements Player {
  currentPosition: Coordinate;
  forwardVector: Vector;
  readonly eyeHeightInMeters: number;
  readonly speed: number = 0.1;

  constructor(
    coordinate: Coordinate = new Coordinate2D(0, 0),
    forwardVector: Vector = new Vector2D(1, 1).normalize(),
    eyeHeightInMeters: number = AVERAGE_EYE_HEIGHT_METERS,
    speed: number = 0.1,
  ) {
    this.currentPosition = coordinate;
    this.forwardVector = forwardVector;
    this.speed = speed;
    this.eyeHeightInMeters = eyeHeightInMeters;
  }

  move(movementVector: Vector): void {
    this.currentPosition = this.currentPosition.offset(movementVector);
  }
}

export default Player;
