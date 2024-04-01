import Coordinate, { WorldCoordinate } from "../world/Coordinate.ts";

// According to the infallible ChatGPT
const AVERAGE_EYE_HEIGHT_METERS: number = 1.57;

interface Player {
  currentPosition: Coordinate;
  readonly eyeHeightInMeters: number;
}

export class DemoPlayer implements Player {
  currentPosition: Coordinate;
  readonly eyeHeightInMeters: number = AVERAGE_EYE_HEIGHT_METERS;

  constructor(coordinate: Coordinate = new WorldCoordinate(0, 0)) {
    this.currentPosition = coordinate;
  }
}

export default Player;
