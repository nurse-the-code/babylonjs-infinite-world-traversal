import Direction from "./Direction.ts";

// We are manually implementing vector classes and interfaces to maintain a
// separation of concerns between the Babylon.js and game logic. In your own
// projects, you might prefer to use Babylon.js's built-in vector classes.

interface Vector {
  readonly x: number;
  readonly z: number;
  add(vector: Vector): Vector;
  normalize(): Vector;
  scale(factor: number): Vector;
  rotate(angleRadians: number): Vector;
  rotateDirection(direction: Direction): Vector;
}

export class Vector2D implements Vector {
  constructor(
    readonly x: number,
    readonly z: number,
  ) {}

  add(vector: Vector2D): Vector2D {
    return new Vector2D(this.x + vector.x, this.z + vector.z);
  }

  normalize(): Vector2D {
    const length = Math.sqrt(this.x * this.x + this.z * this.z);
    if (length === 0) {
      return new Vector2D(0, 0); // Avoid division by zero
    }
    return new Vector2D(this.x / length, this.z / length);
  }

  scale(factor: number): Vector2D {
    return new Vector2D(this.x * factor, this.z * factor);
  }

  rotate(angleRadians: number): Vector2D {
    const cosTheta = Math.cos(angleRadians);
    const sinTheta = Math.sin(angleRadians);
    return new Vector2D(
      this.x * cosTheta - this.z * sinTheta, // New x
      this.x * sinTheta + this.z * cosTheta, // New z
    );
  }

  rotateDirection(direction: Direction): Vector2D {
    let angleRadians: number;
    switch (direction) {
      case Direction.Forward:
        angleRadians = 0; // No rotation needed
        break;
      case Direction.Backward:
        angleRadians = Math.PI; // 180 degrees in radians
        break;
      case Direction.Left:
        angleRadians = Math.PI / 2; // 90 degrees in radians
        break;
      case Direction.Right:
        angleRadians = -Math.PI / 2; // -90 degrees in radians
        break;
    }
    return this.rotate(angleRadians);
  }
}

export default Vector;
