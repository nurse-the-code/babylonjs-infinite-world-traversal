interface Coordinate {
  readonly x: number;
  readonly z: number;
  distanceTo(other: Coordinate): number;
  equals(other: Coordinate): boolean;
  offset(dx: number, dz: number): Coordinate;
}

const X_AXIS = "x";
const Z_AXIS = "z";

type Axis = typeof X_AXIS | typeof Z_AXIS;

export class WorldCoordinate implements Coordinate {
  readonly x: number;
  readonly z: number;

  constructor(x: number, z: number) {
    this.x = this.validateCoordinate(x, X_AXIS);
    this.z = this.validateCoordinate(z, Z_AXIS);
  }

  distanceTo(other: WorldCoordinate): number {
    const dx: number = this.x - other.x;
    const dz: number = this.z - other.z;
    return Math.sqrt(dx * dx + dz * dz);
  }

  equals(other: WorldCoordinate): boolean {
    return this.x === other.x && this.z === other.z;
  }

  offset(dx: number, dz: number): WorldCoordinate {
    return new WorldCoordinate(this.x + dx, this.z + dz);
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
