import Coordinate, { CoordinateOffset } from "./Coordinate.ts";
import Square from "./Square.ts";

interface Chunk {
  readonly position: Coordinate;
  readonly squares: Square[];
  getSquareByOffset(offset: CoordinateOffset): Square | undefined;
}

export class GridChunk implements Chunk {
  readonly position: Coordinate;
  readonly squares: Square[];
  private readonly SquareClass: new (
    position: Coordinate,
    offset: CoordinateOffset,
  ) => Square;

  constructor(
    coordinate: Coordinate,
    SquareClass: new (position: Coordinate, offset: CoordinateOffset) => Square,
  ) {
    this.position = coordinate;
    this.SquareClass = SquareClass;
    this.squares = this.createSquares();
  }

  getSquareByOffset(offset: CoordinateOffset): Square | undefined {
    if (!Number.isInteger(offset.dx) || !Number.isInteger(offset.dz)) {
      throw new Error(
        "When getting a square by offset, the offset must be an integer.",
      );
    }
    // if offset is out of bounds, return undefined
    if (offset.dx < 0 || offset.dz < 0 || offset.dx >= 16 || offset.dz >= 16) {
      throw new Error(
        "When getting a square by offset, the offset must be within the chunk.",
      );
    }
    const index = offset.dx * 16 + offset.dz;
    return this.squares[index];
  }

  private createSquares(): Square[] {
    const squares: Square[] = [];
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        const offset: CoordinateOffset = { dx: x, dz: z };
        squares.push(new this.SquareClass(this.position, offset));
      }
    }
    return squares;
  }
}

export default Chunk;
