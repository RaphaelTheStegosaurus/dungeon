type playerOrientation = "NORTH" | "SOUTH" | "EAST" | "WEST";
type SpritePosition = 0 | 1;
interface rectAttribute {
  x: number;
  y: number;
  height: number;
  width: number;
}
type Coord = Pick<rectAttribute, "x" | "y">;
type Sizes = Pick<rectAttribute, "width" | "height">;
export type { rectAttribute, playerOrientation, SpritePosition, Coord ,Sizes};
