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
  | "door-hided-bottom";
interface DoorAttribute extends rectAttribute {
  face: DoorFace;
}
type room = "room1" | "room2" | "room3" | "room4";
interface RoomDoorFaces {
  room1: DoorFace[];
  room2: DoorFace[];
  room3: DoorFace[];
  room4: DoorFace[];
}
export type {
  rectAttribute,
  playerOrientation,
  SpritePosition,
  Coord,
  Sizes,
  DoorFace,
  DoorAttribute,
  room,
  RoomDoorFaces,
};
