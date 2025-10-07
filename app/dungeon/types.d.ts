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
interface Sets_of_Doorfaces_by_Room {
  [title: room]: DoorFace[];
}
interface Navigation_Room {
  prev: room | undefined;
  next: room | undefined;
}
// interface Aside_Room_Sets {
//   [title: room]: {
//     ["prev" | "next"]: room | undefined;
//   };
// }
interface Aside_Room_Sets {
  [title: room]: Navigation_Room;
}
type NPC_Id = 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
  Sets_of_Doorfaces_by_Room,
  Aside_Room_Sets,
  Navigation_Room,
  NPC_Id,
};
