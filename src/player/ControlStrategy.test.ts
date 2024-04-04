import { KeyboardControlStrategy } from "./ControlStrategy.ts";
import Player from "./Player.ts";
import Coordinate, { Coordinate2D } from "../geometry/Coordinate.ts";
import Vector, { Vector2D } from "../geometry/Vector.ts";

class MockPlayer implements Player {
  readonly currentPosition: Coordinate;
  readonly eyeHeightInMeters: number;
  readonly speed: number;
  forwardVector: Vector;

  constructor(
    coordinate: Coordinate = new Coordinate2D(0, 0),
    forwardVector: Vector = new Vector2D(1, 1).normalize(),
    eyeHeightInMeters: number = 1.75,
    speed: number = 0.1,
  ) {
    this.currentPosition = coordinate;
    this.forwardVector = forwardVector;
    this.eyeHeightInMeters = eyeHeightInMeters;
    this.speed = speed;
  }

  move(_movementVector: Vector): void {
    throw new Error("Method not implemented.");
  }
}

describe("KeyboardControlStrategy", () => {
  let player: Player;
  let controlStrategy: KeyboardControlStrategy;

  beforeEach(() => {
    player = new MockPlayer();
    controlStrategy = new KeyboardControlStrategy(player);
  });

  describe("moveForward", () => {
    it("should move the player forward", () => {
      controlStrategy.movingForward = true;
      controlStrategy.calculateMovementVector();
      expect(controlStrategy.movementVector.x).toBeCloseTo(0.0707);
      expect(controlStrategy.movementVector.z).toBeCloseTo(0.0707);
    });
    it("should stop the player from moving forward", () => {
      controlStrategy.movingForward = true;
      controlStrategy.calculateMovementVector();

      controlStrategy.movingForward = false;
      controlStrategy.calculateMovementVector();
      expect(controlStrategy.movementVector.x).toBe(0);
      expect(controlStrategy.movementVector.z).toBe(0);
    });
  });
  describe("moveLeft", () => {
    it("should move the player left", () => {
      controlStrategy.movingLeft = true;
      controlStrategy.calculateMovementVector();
      expect(controlStrategy.movementVector.x).toBeCloseTo(-0.0707);
      expect(controlStrategy.movementVector.z).toBeCloseTo(0.0707);
    });
    it("should stop the player from moving left", () => {
      controlStrategy.movingLeft = true;
      controlStrategy.calculateMovementVector();

      controlStrategy.movingLeft = false;
      controlStrategy.calculateMovementVector();
      expect(controlStrategy.movementVector.x).toBe(0);
      expect(controlStrategy.movementVector.z).toBe(0);
    });
  });
  describe("moveBackward", () => {
    it("should move the player backward", () => {
      controlStrategy.movingBackward = true;
      controlStrategy.calculateMovementVector();
      expect(controlStrategy.movementVector.x).toBeCloseTo(-0.0707);
      expect(controlStrategy.movementVector.z).toBeCloseTo(-0.0707);
    });
    it("should stop the player from moving backward", () => {
      controlStrategy.movingBackward = true;
      controlStrategy.calculateMovementVector();

      controlStrategy.movingBackward = false;
      controlStrategy.calculateMovementVector();
      expect(controlStrategy.movementVector.x).toBe(0);
      expect(controlStrategy.movementVector.z).toBe(0);
    });
  });
  describe("moveRight", () => {
    it("should move the player right", () => {
      controlStrategy.movingRight = true;
      controlStrategy.calculateMovementVector();
      expect(controlStrategy.movementVector.x).toBeCloseTo(0.0707);
      expect(controlStrategy.movementVector.z).toBeCloseTo(-0.0707);
    });
    it("should stop the player from moving right", () => {
      controlStrategy.movingRight = true;
      controlStrategy.calculateMovementVector();

      controlStrategy.movingRight = false;
      controlStrategy.calculateMovementVector();
      expect(controlStrategy.movementVector.x).toBe(0);
      expect(controlStrategy.movementVector.z).toBe(0);
    });
  });
  describe("concurrent input", () => {
    it("should move the player diagonally forward and right", () => {
      controlStrategy.movingForward = true;
      controlStrategy.movingRight = true;
      controlStrategy.calculateMovementVector();

      expect(controlStrategy.movementVector.x).toBeCloseTo(0.1);
      expect(controlStrategy.movementVector.z).toBeCloseTo(0);
    });
    it("should move the player diagonally forward and left", () => {
      controlStrategy.movingForward = true;
      controlStrategy.movingLeft = true;
      controlStrategy.calculateMovementVector();

      expect(controlStrategy.movementVector.x).toBeCloseTo(0);
      expect(controlStrategy.movementVector.z).toBeCloseTo(0.1);
    });
    it("should move the player diagonally backward and right", () => {
      controlStrategy.movingBackward = true;
      controlStrategy.movingRight = true;
      controlStrategy.calculateMovementVector();

      expect(controlStrategy.movementVector.x).toBeCloseTo(0);
      expect(controlStrategy.movementVector.z).toBeCloseTo(-0.1);
    });
    it("should move the player diagonally backward and left", () => {
      controlStrategy.movingBackward = true;
      controlStrategy.movingLeft = true;
      controlStrategy.calculateMovementVector();

      expect(controlStrategy.movementVector.x).toBeCloseTo(-0.1);
      expect(controlStrategy.movementVector.z).toBeCloseTo(0);
    });
    it("should cancel out simultaneous left and right strafing", () => {
      controlStrategy.movingLeft = true;
      controlStrategy.movingRight = true;
      controlStrategy.calculateMovementVector();

      expect(controlStrategy.movementVector.x).toBe(0);
      expect(controlStrategy.movementVector.z).toBe(0);

      controlStrategy.movingForward = true;
      controlStrategy.calculateMovementVector();

      expect(controlStrategy.movementVector.x).toBeCloseTo(0.0707);
      expect(controlStrategy.movementVector.z).toBeCloseTo(0.0707);
    });
    it("should cancel out simultaneous forward and backward movement", () => {
      controlStrategy.movingForward = true;
      controlStrategy.movingBackward = true;
      controlStrategy.calculateMovementVector();

      expect(controlStrategy.movementVector.x).toBe(0);
      expect(controlStrategy.movementVector.z).toBe(0);
    });
    it("should stop the player from moving in certain directions while still moving in others", () => {
      controlStrategy.movingForward = true;
      controlStrategy.movingLeft = true;
      controlStrategy.calculateMovementVector();

      expect(controlStrategy.movementVector.x).toBeCloseTo(0);
      expect(controlStrategy.movementVector.z).toBeCloseTo(0.1);

      controlStrategy.movingForward = false;
      controlStrategy.calculateMovementVector();

      expect(controlStrategy.movementVector.x).toBeCloseTo(-0.0707);
      expect(controlStrategy.movementVector.z).toBeCloseTo(0.0707);
    });
  });
});
