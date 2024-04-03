import Coordinate from "../geometry/Coordinate.ts";

/**
 * Enum for color values based on the primary, secondary, and tertiary colors
 * of the color wheel, with corresponding hexadecimal values.
 */
enum Color {
  Red = "#FF0000", // 0 Degrees
  Orange = "#FF7F00", // 30 Degrees
  Yellow = "#FFFF00", // 60 Degrees
  ChartreuseGreen = "#7FFF00", // 90 Degrees
  Green = "#00FF00", // 120 Degrees
  SpringGreen = "#00FF7F", // 150 Degrees
  Cyan = "#00FFFF", // 180 Degrees
  Azure = "#007FFF", // 210 Degrees
  Blue = "#0000FF", // 240 Degrees
  Violet = "#7F00FF", // 270 Degrees
  Magenta = "#FF00FF", // 300 Degrees
  Rose = "#FF007F", // 330 Degrees
}

/**
 * Generates a color based on the x and z coordinates of a square. The color
 * is determined by a simple hash of the x and z coordinates, which is used to
 * select a color from the Color enum.
 *
 * @param coordinate
 * @returns a hex color value from the Color enum
 */
export function generateColorFromCoordinate(coordinate: Coordinate): Color {
  // Combine x and z using bitwise XOR to get a non-negative hash value
  // Bitwise operations in JavaScript operate on 32-bit integers, treating inputs as such
  const hash: number = (coordinate.x << 16) ^ coordinate.z; // Shift and combine
  const colorKeys: Array<keyof typeof Color> = Object.keys(Color) as Array<
    keyof typeof Color
  >; // Get enum keys as an array of strings

  // Use Math.abs to ensure the index is non-negative
  const colorIndex: number = Math.abs(hash) % Object.keys(Color).length;
  const colorKey: keyof typeof Color = colorKeys[colorIndex];
  return Color[colorKey]; // Access the enum by key to get the value
}

export default Color;
