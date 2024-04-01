import Coordinate, { CoordinateOffset } from "./Coordinate.ts";
import Color, { generateColorFromCoordinate } from "./Color.ts";

interface Square {
  readonly absolutePosition: Coordinate;
  readonly relativePosition: CoordinateOffset;
  readonly color: Color;
}

export class GridSquare implements Square {
  absolutePosition: Coordinate;
  relativePosition: CoordinateOffset;
  color: Color;

  constructor(coordinate: Coordinate, offset: CoordinateOffset) {
    this.absolutePosition = coordinate.offset(offset);
    this.relativePosition = offset;
    this.color = generateColorFromCoordinate(this.absolutePosition);
  }
}

export default Square;
