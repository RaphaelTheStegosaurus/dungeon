type playerOrientation = "NORTH" | "SOUTH" | "EAST" | "WEST";
type SpritePosition = 0 | 1;
interface rectAttribute {
  x: number;
  y: number;
  height: number;
  width: number;
}
export type { rectAttribute, playerOrientation, SpritePosition };
