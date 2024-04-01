import Color, { generateColorFromCoordinate } from "./Color.ts";
import Coordinate, { CoordinateOffset } from "./Coordinate.ts";

// create a mock class to be shared between all the tests
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

// write tests for the generateColorFromCoordinate function
describe("generateColorFromCoordinate", () => {
  it("should return a color based on the coordinate", () => {
    const coordinate = new MockCoordinate(0, 0);
    const color = generateColorFromCoordinate(coordinate);
    expect(Object.values(Color)).toContain(color);
  });
  it("should return a different color for different coordinates", () => {
    const coordinate1 = new MockCoordinate(0, 0);
    const coordinate2 = new MockCoordinate(1, 1);
    const color1 = generateColorFromCoordinate(coordinate1);
    const color2 = generateColorFromCoordinate(coordinate2);
    expect(color1).not.toBe(color2);
  });
  it("should return the same color for the same coordinate", () => {
    const coordinate1 = new MockCoordinate(0, 0);
    const coordinate2 = new MockCoordinate(0, 0);
    const color1 = generateColorFromCoordinate(coordinate1);
    const color2 = generateColorFromCoordinate(coordinate2);
    expect(color1).toBe(color2);
  });
  it("should return a color for a negative coordinate", () => {
    const coordinate = new MockCoordinate(-1, -1);
    const color = generateColorFromCoordinate(coordinate);
    expect(Object.values(Color)).toContain(color);
  });
  it("should return a color for a large coordinate", () => {
    const coordinate = new MockCoordinate(
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
    );
    const color = generateColorFromCoordinate(coordinate);
    expect(Object.values(Color)).toContain(color);
  });
  it("should return a color for a small coordinate", () => {
    const coordinate = new MockCoordinate(
      Number.MIN_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
    );
    const color = generateColorFromCoordinate(coordinate);
    expect(Object.values(Color)).toContain(color);
  });
  it("should return a consistent color for specific coordinates", () => {
    const coordinate1 = new MockCoordinate(0, 0);
    const coordinate2 = new MockCoordinate(
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
    );
    const coordinate3 = new MockCoordinate(
      Number.MIN_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
    );
    const color1 = generateColorFromCoordinate(coordinate1);
    const color2 = generateColorFromCoordinate(coordinate2);
    const color3 = generateColorFromCoordinate(coordinate3);
    expect(color1).toBe(Color.Red);
    expect(color2).toBe(Color.ChartreuseGreen);
    expect(color3).toBe(Color.SpringGreen);
  });
});
