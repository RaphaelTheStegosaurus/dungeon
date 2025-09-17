import Room from "../rooms/room";
import {
  Coord,
  DoorAttribute,
  DoorFace,
  Navigation_Room,
  rectAttribute,
  room,
  Sizes,
} from "../types";
import { WALLS_WIDTH, DOOR_SAMPLE, ASIDE_ROOMS } from "./constants";

export const checkIfPlayerEnteringTheDoor = (
  playerRect: rectAttribute,
  doors: DoorAttribute[]
): DoorAttribute | undefined => {
  for (const door of doors) {
    if (
      playerRect.x < door.x + door.width &&
      playerRect.x + playerRect.width > door.x &&
      playerRect.y < door.y + door.height &&
      playerRect.y + playerRect.height > door.y
    ) {
      return door;
    }
  }
  return undefined;
};
export const checkBoundaries = (
  newX: number,
  newY: number,
  playerAttributes: rectAttribute,
  roomSize: Sizes
): Coord => {
  const minX = 0 + WALLS_WIDTH;
  const minY = 0 + WALLS_WIDTH;
  const maxX = roomSize.width - playerAttributes.width - WALLS_WIDTH;
  const maxY = roomSize.height - playerAttributes.height - WALLS_WIDTH;
  const constrainedX = Math.min(Math.max(newX, minX), maxX);
  const constrainedY = Math.min(Math.max(newY, minY), maxY);
  return { x: constrainedX, y: constrainedY };
};

export const returnDoorPositionY = (
  _doorFace: DoorFace,
  _roomSize: Sizes
): number => {
  switch (_doorFace) {
    case "door-hided-top":
      return -(DOOR_SAMPLE.height * 2);
    case "door-face-top":
      return WALLS_WIDTH;
    case "door-face-bottom":
      return _roomSize.height - DOOR_SAMPLE.height - WALLS_WIDTH;
    case "door-hided-bottom":
      return _roomSize.height + DOOR_SAMPLE.height * 2;
    default:
      return DOOR_SAMPLE.y;
  }
};
export const changeRoom = (_doorFace: DoorFace, currentRoom: room): room => {
  const currentAsideRoom:Navigation_Room = ASIDE_ROOMS[currentRoom];
  if (_doorFace === "door-face-top") {
    if (currentAsideRoom.prev) {
      return currentAsideRoom.prev;
    }
  }
  if (_doorFace === "door-face-bottom") {
    if (currentAsideRoom.next) {
      return currentAsideRoom.next;
    }
  }
  return currentRoom;
};
