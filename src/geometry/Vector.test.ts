import { Vector2D } from "./Vector.ts";

describe("Vector2D", () => {
  describe("constructor", () => {
    it("should create new instance of Vector2D", () => {
      const vectors = [
        new Vector2D(0, 0),
        new Vector2D(1, 1),
        new Vector2D(-1, -1),
        new Vector2D(0.5, 0.5),
        new Vector2D(4, 5),
      ];
      vectors.forEach((vector) => {
        expect(vector).toBeInstanceOf(Vector2D);
      });
    });
  });
  describe("add", () => {
    it("should add two vectors", () => {
      const vector1 = new Vector2D(1, 2);
      const vector2 = new Vector2D(3, 5);
      const result = vector1.add(vector2);
      expect(result.x).toBe(4);
      expect(result.z).toBe(7);
    });
    it("should cancel out vectors", () => {
      const vector1 = new Vector2D(1, 2);
      const vector2 = new Vector2D(-1, -2);
      const result = vector1.add(vector2);
      expect(result.x).toBe(0);
      expect(result.z).toBe(0);
    });
  });
  describe("normalize", () => {
    it("should normalize a vector", () => {
      const vector = new Vector2D(3, 4);
      const result = vector.normalize();
      expect(result.x).toBeCloseTo(0.6);
      expect(result.z).toBeCloseTo(0.8);
    });
    it("should normalize a vector longer than 1", () => {
      const vector = new Vector2D(-6, -8);
      const result = vector.normalize();
      expect(result.x).toBeCloseTo(-0.6);
      expect(result.z).toBeCloseTo(-0.8);
    });
    it("should normalize a vector shorter than 1", () => {
      const vector = new Vector2D(0.5, -0.5);
      const result = vector.normalize();
      expect(result.x).toBeCloseTo(0.707);
      expect(result.z).toBeCloseTo(-0.707);
    });
    it("should return a zero vector if the vector is the zero vector", () => {
      const vector = new Vector2D(0, 0);
      const result = vector.normalize();
      expect(result.x).toBe(0);
      expect(result.z).toBe(0);
    });
  });
  describe("scale", () => {
    it("should scale a vector", () => {
      const vector = new Vector2D(3, 4);
      const result = vector.scale(2);
      expect(result.x).toBe(6);
      expect(result.z).toBe(8);
    });
    it("should scale a vector by a fraction", () => {
      const vector = new Vector2D(3, 4);
      const result = vector.scale(0.5);
      expect(result.x).toBe(1.5);
      expect(result.z).toBe(2);
    });
    it("should scale a vector by a negative factor", () => {
      const vector = new Vector2D(3, 4);
      const result = vector.scale(-1);
      expect(result.x).toBe(-3);
      expect(result.z).toBe(-4);
    });
  });
  describe("rotate", () => {
    it("should rotate a vector by 90 degrees clockwise", () => {
      const angle = Math.PI * 1.5; // 90 degrees clockwise in radians

      const vector1 = new Vector2D(0.707, 0.707);
      const result1 = vector1.rotate(angle);
      expect(result1.x).toBeCloseTo(0.707);
      expect(result1.z).toBeCloseTo(-0.707);

      const vector2 = new Vector2D(-0.707, -0.707);
      const result2 = vector2.rotate(angle);
      expect(result2.x).toBeCloseTo(-0.707);
      expect(result2.z).toBeCloseTo(0.707);
    });
    it("should rotate a vector by 90 degrees counterclockwise", () => {
      const angle = Math.PI / 2; // 90 degrees counterclockwise in radians
      const vector1 = new Vector2D(0.707, 0.707);
      const result1 = vector1.rotate(angle);
      expect(result1.x).toBeCloseTo(-0.707);
      expect(result1.z).toBeCloseTo(0.707);

      const vector2 = new Vector2D(-0.707, -0.707);
      const result2 = vector2.rotate(angle);
      expect(result2.x).toBeCloseTo(0.707);
      expect(result2.z).toBeCloseTo(-0.707);
    });
    it("should rotate a vector by 180 degrees", () => {
      const angle = Math.PI; // 180 degrees in radians
      const vector1 = new Vector2D(-3, 4);
      const result1 = vector1.rotate(angle);
      expect(result1.x).toBeCloseTo(3);
      expect(result1.z).toBeCloseTo(-4);

      const vector2 = new Vector2D(4, -3);
      const result2 = vector2.rotate(angle);
      expect(result2.x).toBeCloseTo(-4);
      expect(result2.z).toBeCloseTo(3);
    });
    it("should rotate a vector 360 degrees", () => {
      const angle = Math.PI * 2; // 360 degrees in radians
      const vector = new Vector2D(3, 4);
      const result = vector.rotate(angle);
      expect(result.x).toBeCloseTo(3);
      expect(result.z).toBeCloseTo(4);
    });
    it("should rotate a vector more than 360 degrees", () => {
      const angle = Math.PI * 2.25; // 405 degrees in radians
      const vector = new Vector2D(-0.707, -0.707);
      const result = vector.rotate(angle);
      expect(result.x).toBeCloseTo(0);
      expect(result.z).toBeCloseTo(-1);
    });
    it("should rotate a vector correctly when given a negative angle", () => {
      const angle = -Math.PI / 2; // -90 degrees in radians

      const vector1 = new Vector2D(0.707, -0.707);
      const result1 = vector1.rotate(angle);
      expect(result1.x).toBeCloseTo(-0.707);
      expect(result1.z).toBeCloseTo(-0.707);

      const vector2 = new Vector2D(-0.707, 0.707);
      const result2 = vector2.rotate(angle);
      expect(result2.x).toBeCloseTo(0.707);
      expect(result2.z).toBeCloseTo(0.707);
    });
  });
});
