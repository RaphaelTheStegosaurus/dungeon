import {
  rectAttribute,
  RoomDoorFaces,
  Aside_Room_Sets,
  Sets_of_Doorfaces_by_Room,
} from "../types";

export const PLAYER_VELOCITY = 20;
export const WALLS_WIDTH = 20;
export const DOOR_SAMPLE: rectAttribute = {
  x: 0,
  y: 0,
  height: 20,
  width: 75,
};

export const SETS_OF_FACES_BY_ROOM: Sets_of_Doorfaces_by_Room = {
  room1: ["door-face-bottom", "door-hided-top", "door-hided-bottom"],
  room2: ["door-face-top", "door-face-bottom", "door-hided-bottom"],
  room3: ["door-hided-top", "door-face-top", "door-face-bottom"],
  room4: ["door-hided-top", "door-hided-top", "door-face-top"],
};

export const ASIDE_ROOMS: Aside_Room_Sets = {
  room1: {
    prev: undefined,
    next: "room2",
  },
  room2: {
    prev: "room1",
    next: "room3",
  },
  room3: {
    prev: "room2",
    next: "room4",
  },
  room4: {
    prev: "room3",
    next: undefined,
  },
};
