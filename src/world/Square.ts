import Coordinate from "../geometry/Coordinate.ts";
import Vector from "../geometry/Vector.ts";
import Color, { generateColorFromCoordinate } from "./Color.ts";

interface Square {
  readonly absolutePosition: Coordinate;
  readonly relativePosition: Vector;
  readonly color: Color;
}

export class GridSquare implements Square {
  absolutePosition: Coordinate;
  relativePosition: Vector;
  color: Color;

  constructor(coordinate: Coordinate, offset: Vector) {
    this.absolutePosition = coordinate.offset(offset);
    this.relativePosition = offset;
    this.color = generateColorFromCoordinate(this.absolutePosition);
  }
}

export default Square;
