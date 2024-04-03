import Vector, { Vector2D } from "./Vector.ts";

interface Coordinate {
  readonly x: number;
  readonly z: number;
  distanceTo(other: Coordinate): number;
  equals(other: Coordinate): boolean;
  offset(offset: Vector): Coordinate;
}

const X_AXIS = "x";
const Z_AXIS = "z";

type Axis = typeof X_AXIS | typeof Z_AXIS;

export class Coordinate2D implements Coordinate {
  readonly x: number;
  readonly z: number;

  constructor(x: number, z: number) {
    this.x = this.validateCoordinate(x, X_AXIS);
    this.z = this.validateCoordinate(z, Z_AXIS);
  }

  distanceTo(other: Coordinate2D): number {
    const dx: number = this.x - other.x;
    const dz: number = this.z - other.z;
    return Math.sqrt(dx * dx + dz * dz);
  }

  equals(other: Coordinate2D): boolean {
    return this.x === other.x && this.z === other.z;
  }

  offset(offset: Vector2D): Coordinate {
    return new Coordinate2D(this.x + offset.x, this.z + offset.z);
  }

  private validateCoordinate(value: number, axis: Axis): number {
    if (value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER) {
      return value;
    } else {
      throw new Error(
        `The value for the ${axis} axis must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}. Provided value: ${value}`,
      );
    }
  }
}

export default Coordinate;
