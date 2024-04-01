import { GridChunk } from "./Chunk.ts";
import Coordinate, { CoordinateOffset } from "./Coordinate.ts";
import Square from "./Square.ts";
import Color from "./Color.ts";

// create a mock classes to be shared between all the tests
class MockSquare implements Square {
  absolutePosition: Coordinate;
  relativePosition: CoordinateOffset;
  color: Color;

  constructor(coordinate: Coordinate, offset: CoordinateOffset) {
    this.absolutePosition = coordinate;
    this.relativePosition = offset;
    this.color = Color.Red;
  }
}

class MockCoordinate implements Coordinate {
  x: number;
  z: number;

  constructor(x: number, z: number) {
    this.x = x;
    this.z = z;
  }

  distanceTo(_other: Coordinate): number {
    throw new Error("Method not implemented.");
  }

  equals(_other: Coordinate): boolean {
    throw new Error("Method not implemented.");
  }

  offset(_offset: CoordinateOffset): Coordinate {
    throw new Error("Method not implemented.");
  }
}

describe("GridChunk", () => {
  describe("constructor", () => {
    it("should create a new instance of GridChunk", () => {
      const chunk = new GridChunk(new MockCoordinate(0, 0), MockSquare);
      expect(chunk).toBeInstanceOf(GridChunk);
    });

    it("should create a new instance with the provided coordinate", () => {
      const coordinate = new MockCoordinate(1, 2);
      const chunk = new GridChunk(coordinate, MockSquare);
      expect(chunk.position).toBe(coordinate);
    });

    it("should create a new instance with the provided Square class", () => {
      const chunk = new GridChunk(new MockCoordinate(0, 0), MockSquare);
      expect(chunk.squares[0]).toBeInstanceOf(MockSquare);
    });

    it("should create a new instance with 256 squares", () => {
      const chunk = new GridChunk(new MockCoordinate(0, 0), MockSquare);
      expect(chunk.squares.length).toBe(256);
    });

    it("should create a new instance with the correct relative square positions", () => {
      const chunk = new GridChunk(new MockCoordinate(0, 0), MockSquare);
      expect(chunk.squares[0].relativePosition).toEqual({ dx: 0, dz: 0 });
      expect(chunk.squares[15].relativePosition).toEqual({ dx: 0, dz: 15 });
      expect(chunk.squares[240].relativePosition).toEqual({ dx: 15, dz: 0 });
      expect(chunk.squares[255].relativePosition).toEqual({ dx: 15, dz: 15 });
    });
  });
  describe("getSquareByOffset", () => {
    it("should return the square at each of the 4 corners", () => {
      const chunk = new GridChunk(new MockCoordinate(1, -1), MockSquare);
      expect(chunk.getSquareByOffset({ dx: 0, dz: 0 })).toBe(chunk.squares[0]);
      expect(chunk.getSquareByOffset({ dx: 0, dz: 15 })).toBe(
        chunk.squares[15],
      );
      expect(chunk.getSquareByOffset({ dx: 15, dz: 0 })).toBe(
        chunk.squares[16 * 15],
      );
      expect(chunk.getSquareByOffset({ dx: 15, dz: 15 })).toBe(
        chunk.squares[16 * 16 - 1],
      );
    });
    it("should return the squares in the middle", () => {
      const chunk = new GridChunk(new MockCoordinate(-1, 1), MockSquare);
      expect(chunk.getSquareByOffset({ dx: 5, dz: 4 })).toBe(
        chunk.squares[5 * 16 + 4],
      );
      expect(chunk.getSquareByOffset({ dx: 11, dz: 12 })).toBe(
        chunk.squares[11 * 16 + 12],
      );
    });
    it("should throw an error for an out-of-bounds offset", () => {
      const chunk = new GridChunk(new MockCoordinate(-1, -1), MockSquare);
      expect(() => chunk.getSquareByOffset({ dx: -1, dz: 0 })).toThrow(
        "When getting a square by offset, the offset must be within the chunk.",
      );
      expect(() => chunk.getSquareByOffset({ dx: 0, dz: -1 })).toThrow(
        "When getting a square by offset, the offset must be within the chunk.",
      );
      expect(() => chunk.getSquareByOffset({ dx: 16, dz: 0 })).toThrow(
        "When getting a square by offset, the offset must be within the chunk.",
      );
      expect(() => chunk.getSquareByOffset({ dx: 0, dz: 16 })).toThrow(
        "When getting a square by offset, the offset must be within the chunk.",
      );
    });

    it("should throw error for a non-integer offset", () => {
      const chunk = new GridChunk(new MockCoordinate(0, 0), MockSquare);
      expect(() => chunk.getSquareByOffset({ dx: 0.5, dz: 0 })).toThrow(
        "When getting a square by offset, the offset must be an integer.",
      );
      expect(() => chunk.getSquareByOffset({ dx: 0, dz: 0.5 })).toThrow(
        "When getting a square by offset, the offset must be an integer.",
      );
    });
  });
});
