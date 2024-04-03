import Coordinate from "../geometry/Coordinate.ts";
import Vector, { Vector2D } from "../geometry/Vector.ts";
import Square from "./Square.ts";

interface Chunk {
  readonly position: Coordinate;
  readonly squares: Square[];
  getSquareByOffset(offset: Vector): Square | undefined;
}

export class GridChunk implements Chunk {
  readonly position: Coordinate;
  readonly squares: Square[];
  private readonly SquareClass: new (
    position: Coordinate,
    offset: Vector,
  ) => Square;

  constructor(
    coordinate: Coordinate,
    SquareClass: new (position: Coordinate, offset: Vector) => Square,
  ) {
    this.position = coordinate;
    this.SquareClass = SquareClass;
    this.squares = this.createSquares();
  }

  getSquareByOffset(offset: Vector): Square | undefined {
    if (!Number.isInteger(offset.x) || !Number.isInteger(offset.z)) {
      throw new Error(
        "When getting a square by offset, the offset must be an integer.",
      );
    }
    // if offset is out of bounds, return undefined
    if (offset.x < 0 || offset.z < 0 || offset.x >= 16 || offset.z >= 16) {
      throw new Error(
        "When getting a square by offset, the offset must be within the chunk.",
      );
    }
    const index = offset.x * 16 + offset.z;
    return this.squares[index];
  }

  private createSquares(): Square[] {
    const squares: Square[] = [];
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        const offset: Vector = new Vector2D(x, z);
        squares.push(new this.SquareClass(this.position, offset));
      }
    }
    return squares;
  }
}

export default Chunk;
