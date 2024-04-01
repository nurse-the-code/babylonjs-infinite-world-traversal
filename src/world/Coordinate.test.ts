import { WorldCoordinate } from "./Coordinate.ts";

describe("WorldCoordinate", () => {
  describe("constructor", () => {
    it("should create a new instance of WorldCoordinate", () => {
      const coordinate = new WorldCoordinate(0, 0);
      expect(coordinate).toBeInstanceOf(WorldCoordinate);
    });

    it("should create a new instance with the provided x and z values", () => {
      const coordinate = new WorldCoordinate(1, 2);
      expect(coordinate.x).toBe(1);
      expect(coordinate.z).toBe(2);
    });

    it("should create a new instance with fractional x and z values", () => {
      const coordinate = new WorldCoordinate(1.5, 2.5);
      expect(coordinate.x).toBe(1.5);
      expect(coordinate.z).toBe(2.5);
    });

    it("should create a new instance with the minimum safe integer for x and z", () => {
      const coordinate = new WorldCoordinate(
        Number.MIN_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
      );
      expect(coordinate.x).toBe(Number.MIN_SAFE_INTEGER);
      expect(coordinate.z).toBe(Number.MIN_SAFE_INTEGER);
    });

    it("should create a new instance with the maximum safe integer for x and z", () => {
      const coordinate = new WorldCoordinate(
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
      );
      expect(coordinate.x).toBe(Number.MAX_SAFE_INTEGER);
      expect(coordinate.z).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("should throw an error if the x value is less than the minimum safe integer", () => {
      expect(() => new WorldCoordinate(Number.MIN_SAFE_INTEGER - 1, 0)).toThrow(
        `The value for the x axis must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}. Provided value: ${Number.MIN_SAFE_INTEGER - 1}`,
      );
    });

    it("should throw an error if the x value is greater than the maximum safe integer", () => {
      expect(() => new WorldCoordinate(Number.MAX_SAFE_INTEGER + 1, 0)).toThrow(
        `The value for the x axis must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}. Provided value: ${Number.MAX_SAFE_INTEGER + 1}`,
      );
    });

    it("should throw an error if the z value is less than the minimum safe integer", () => {
      expect(() => new WorldCoordinate(0, Number.MIN_SAFE_INTEGER - 1)).toThrow(
        `The value for the z axis must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}. Provided value: ${Number.MIN_SAFE_INTEGER - 1}`,
      );
    });

    it("should throw an error if the z value is greater than the maximum safe integer", () => {
      expect(() => new WorldCoordinate(0, Number.MAX_SAFE_INTEGER + 1)).toThrow(
        `The value for the z axis must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}. Provided value: ${Number.MAX_SAFE_INTEGER + 1}`,
      );
    });
  });

  describe("distanceTo", () => {
    it("should return the distance between two coordinates", () => {
      const coordinate1 = new WorldCoordinate(0, 0);
      const coordinate2 = new WorldCoordinate(3, 4);
      expect(coordinate1.distanceTo(coordinate2)).toBe(5);
    });

    it("should return the distance between two coordinates with negative values", () => {
      const coordinate1 = new WorldCoordinate(-1, -1);
      const coordinate2 = new WorldCoordinate(-4, -5);
      expect(coordinate1.distanceTo(coordinate2)).toBe(5);
    });

    it("should return the distance between two coordinates with fractional values", () => {
      const coordinate1 = new WorldCoordinate(0, 0);
      const coordinate2 = new WorldCoordinate(3.5, 4.5);
      expect(coordinate1.distanceTo(coordinate2)).toBeCloseTo(5.7, 1);
    });

    it("should return the distance between two coordinates with negative fractional values", () => {
      const coordinate1 = new WorldCoordinate(-1.2, -1.2);
      const coordinate2 = new WorldCoordinate(-4.7, -5.7);
      expect(coordinate1.distanceTo(coordinate2)).toBeCloseTo(5.7, 1);
    });

    it("should return the distance between two coordinate in different quadrants", () => {
      const coordinate1 = new WorldCoordinate(1, 1);
      const coordinate2 = new WorldCoordinate(-2, -3);
      expect(coordinate1.distanceTo(coordinate2)).toBe(5);
    });

    it("should return the distance between the smallest and largest safe integers", () => {
      const coordinate1 = new WorldCoordinate(
        Number.MIN_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
      );
      const coordinate2 = new WorldCoordinate(
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
      );

      const expectedDistance: number = Math.sqrt(
        (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER) ** 2 * 2,
      );
      const expectedScaledDistance = expectedDistance / 1.0e32;

      const actualDistance = coordinate1.distanceTo(coordinate2);
      const actualScaledDistance = actualDistance / 1.0e32;

      expect(actualScaledDistance).toBeCloseTo(expectedScaledDistance, 2);
    });
  });

  describe("equals", () => {
    it("should return true if two coordinates are equal", () => {
      const coordinate1 = new WorldCoordinate(0, 0);
      const coordinate2 = new WorldCoordinate(0, 0);
      expect(coordinate1.equals(coordinate2)).toBe(true);
    });

    it("should return false if two coordinates are not equal", () => {
      const coordinate1 = new WorldCoordinate(0, 0);
      const coordinate2 = new WorldCoordinate(1, 1);
      expect(coordinate1.equals(coordinate2)).toBe(false);
    });

    it("should return false if two coordinates have the same x value but different z values", () => {
      const coordinate1 = new WorldCoordinate(0, 0);
      const coordinate2 = new WorldCoordinate(0, 1);
      expect(coordinate1.equals(coordinate2)).toBe(false);
    });

    it("should return false if two coordinates have the same z value but different x values", () => {
      const coordinate1 = new WorldCoordinate(0, 0);
      const coordinate2 = new WorldCoordinate(1, 0);
      expect(coordinate1.equals(coordinate2)).toBe(false);
    });
  });

  describe("offset", () => {
    it("should return a new coordinate with the offset x and z values", () => {
      const coordinate = new WorldCoordinate(0, 0);
      const offset = coordinate.offset({ dx: 1, dz: 2 });
      expect(offset.x).toBe(1);
      expect(offset.z).toBe(2);
    });

    it("should return a new coordinate with the offset x and z values with negative values", () => {
      const coordinate = new WorldCoordinate(0, 0);
      const offset = coordinate.offset({ dx: -1, dz: -2 });
      expect(offset.x).toBe(-1);
      expect(offset.z).toBe(-2);
    });

    it("should return a new coordinate with the offset x and z values with fractional values", () => {
      const coordinate = new WorldCoordinate(0, 0);
      const offset = coordinate.offset({ dx: 1.5, dz: 2.5 });
      expect(offset.x).toBe(1.5);
      expect(offset.z).toBe(2.5);
    });

    it("should return a new coordinate with the correct offset x and z values for non-zero starting coordinates", () => {
      const coordinate = new WorldCoordinate(1, 1);
      const offset = coordinate.offset({ dx: 1, dz: 2 });
      expect(offset.x).toBe(2);
      expect(offset.z).toBe(3);
    });

    it("should return a new coordinate with the correct offset x and z values for a cross-quadrant offset", () => {
      const coordinate = new WorldCoordinate(1, 1);
      const offset = coordinate.offset({ dx: -2, dz: -3 });
      expect(offset.x).toBe(-1);
      expect(offset.z).toBe(-2);
    });

    it("should not modify the original coordinate", () => {
      const coordinate = new WorldCoordinate(0, 0);
      coordinate.offset({ dx: 1, dz: 2 });
      expect(coordinate.x).toBe(0);
      expect(coordinate.z).toBe(0);
    });

    it("should allow the offset to be zero", () => {
      const coordinate = new WorldCoordinate(0, 0);
      const offset = coordinate.offset({ dx: 0, dz: 0 });
      expect(offset.x).toBe(0);
      expect(offset.z).toBe(0);
    });

    it("should allow the offset to be greater than the maximum safe integer if the resulting value is a safe integer", () => {
      const coordinate = new WorldCoordinate(
        Number.MIN_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
      );
      const offset = coordinate.offset({
        dx: Number.MAX_SAFE_INTEGER + 1,
        dz: Number.MAX_SAFE_INTEGER + 1,
      });
      expect(offset.x).toBe(1);
      expect(offset.z).toBe(1);
    });

    it("should throw an error if the resulting x value is less than the minimum safe integer", () => {
      const coordinate = new WorldCoordinate(Number.MIN_SAFE_INTEGER, 0);
      expect(() => coordinate.offset({ dx: -1, dz: 0 })).toThrow(
        `The value for the x axis must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}. Provided value: ${Number.MIN_SAFE_INTEGER - 1}`,
      );
    });

    it("should throw an error if the resulting z value is greater than the maximum safe integer", () => {
      const coordinate = new WorldCoordinate(0, Number.MAX_SAFE_INTEGER);
      expect(() => coordinate.offset({ dx: 0, dz: 1 })).toThrow(
        `The value for the z axis must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}. Provided value: ${Number.MAX_SAFE_INTEGER + 1}`,
      );
    });
  });
});
