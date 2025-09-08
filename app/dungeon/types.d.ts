interface rectAttribute {
  x: number;
  y: number;
  height: number;
  width: number;
}
type playerOrientation = "NORTH" | "SOUTH" | "EAST" | "WEST";
type SpritePosition = 0 | 1;
type Coord = Pick<rectAttribute, "x" | "y">;
type Sizes = Pick<rectAttribute, "width" | "height">;
type DoorFace =
  | "door-hided-top"
  | "door-face-top"
  | "door-face-bottom"
  | "door-hided-bottom ";
type room = "room1" | "room2" | "room3" | "room4";
export type { rectAttribute, playerOrientation, SpritePosition, Coord, Sizes };
