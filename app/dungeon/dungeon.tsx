"use client";
import { useEffect, useRef, useState } from "react";
import style from "./dungeon.module.css";
import Player from "./player/player";
import Rooms from "./rooms/rooms";
import Dpad from "./dpad/dpad";
import {
  Coord,
  DoorAttribute,
  DoorFace,
  playerOrientation,
  rectAttribute,
  room,
  RoomDoorFaces,
  Sizes,
  SpritePosition,
} from "./types";
import Doors from "./doors/doors";
export default function Dungeon() {
  //[c] Const
  const PLAYER_VELOCITY = 20;
  const WALLS_WIDTH = 20;
  const DOOR_SAMPLE: rectAttribute = {
    x: 0,
    y: 0,
    height: 20,
    width: 75,
  };
  const SETS_OF_FACES_BY_ROOM: RoomDoorFaces = {
    room1: ["door-face-bottom", "door-hided-bottom", "door-hided-bottom"],
    room2: ["door-face-top", "door-face-bottom", "door-hided-bottom"],
    room3: ["door-hided-top", "door-face-top", "door-face-bottom"],
    room4: ["door-hided-top", "door-hided-top", "door-face-top"],
  };
  //[c] React Variables
  const PLAYER_REF = useRef<HTMLDivElement>(null);
  const DUNGEON_REF = useRef<HTMLDivElement>(null);
  const [playerAttributes, setplayerAttributes] = useState<rectAttribute>({
    x: 50,
    y: 20,
    width: 50,
    height: 50,
  });
  const [playerOrientation, setplayerOrientation] =
    useState<playerOrientation>("SOUTH");
  const [playerSpritePosition, setplayerSpritePosition] =
    useState<SpritePosition>(1);
  const [isPlayerMovement, setisPlayerMovement] = useState(false);
  const [DirectionPlayer, setDirectionPlayer] = useState<Coord>({ x: 0, y: 0 });

  const [currentRoom, setcurrentRoom] = useState<room>("room1");
  const [doors, setdoors] = useState<DoorAttribute[]>([
    { ...DOOR_SAMPLE, face: SETS_OF_FACES_BY_ROOM[currentRoom][0] },
    { ...DOOR_SAMPLE, face: SETS_OF_FACES_BY_ROOM[currentRoom][1] },
    { ...DOOR_SAMPLE, face: SETS_OF_FACES_BY_ROOM[currentRoom][2] },
  ]);

  const [roomSize, setroomSize] = useState<Sizes | null>(null);
  //[c] functions
  const setCoordsDirection = (xCoord: number, yCoord: number) => {
    setDirectionPlayer({ x: xCoord, y: yCoord });
  };
  const setOrientation = (_orientation: playerOrientation) => {
    setplayerOrientation(_orientation);
  };
  const checkBoundaries = (newX: number, newY: number): Coord => {
    if (!roomSize) return { x: newX, y: newY };
    const minX = 0 + WALLS_WIDTH;
    const minY = 0 + WALLS_WIDTH;
    const maxX = roomSize.width - playerAttributes.width - WALLS_WIDTH;
    const maxY = roomSize.height - playerAttributes.height - WALLS_WIDTH;
    const constrainedX = Math.min(Math.max(newX, minX), maxX);
    const constrainedY = Math.min(Math.max(newY, minY), maxY);
    return { x: constrainedX, y: constrainedY };
  };
  const checkIfPlayerEnteringTheDoor = (
    _newX: number,
    _newY: number
  ): DoorAttribute | undefined => {
    const playerRect = {
      x: _newX,
      y: _newY,
      width: playerAttributes.width,
      height: playerAttributes.height,
    };
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
  const changeRoom = (_doorFace: DoorFace) => {
    const ASIDE_ROOMS = {
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
    let currentAsideRoom = ASIDE_ROOMS[currentRoom];
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
  const returnDoorPositionY = (
    _doorFace: DoorFace,
    _roomSize: Sizes
  ): number => {
    switch (_doorFace) {
      case "door-hided-top":
        return -(DOOR_SAMPLE.height * 2);
        break;
      case "door-face-top":
        return WALLS_WIDTH;
        break;
      case "door-face-bottom":
        return _roomSize.height - DOOR_SAMPLE.height - WALLS_WIDTH;
        break;
      case "door-hided-bottom":
        return _roomSize.height + DOOR_SAMPLE.height * 2;
        break;
      default:
        return DOOR_SAMPLE.y;
        break;
    }
  };
  const getAction = () => {};
  //[c] React Functions
  useEffect(() => {
    if (DUNGEON_REF.current) {
      const RoomRect = DUNGEON_REF.current.getBoundingClientRect();
      setroomSize({ width: RoomRect.width, height: RoomRect.height });
    }
  }, []);

  useEffect(() => {
    if (roomSize) {
      setdoors((prevDoors) => {
        const newDoors = prevDoors.map((door, index) => {
          const newFace: DoorFace = SETS_OF_FACES_BY_ROOM[currentRoom][index];
          const newY: number = returnDoorPositionY(newFace, roomSize);
          const newX: number = roomSize.width / 2 - door.width / 2;
          return {
            ...door,
            face: newFace,
            y: newY,
            x: newX,
          };
        });
        return newDoors;
      });
    }
  }, [roomSize, currentRoom]);

  useEffect(() => {
    let playerInterval: NodeJS.Timeout;
    if (isPlayerMovement) {
      let getCurrentX = playerAttributes.x;
      let getCurrentY = playerAttributes.y;
      playerInterval = setInterval(() => {
        getCurrentX += DirectionPlayer.x * PLAYER_VELOCITY;
        getCurrentY += DirectionPlayer.y * PLAYER_VELOCITY;
        const enteredDoor = checkIfPlayerEnteringTheDoor(
          getCurrentX,
          getCurrentY
        );
        if (enteredDoor) {
          setisPlayerMovement(false);
          let nextRoom = changeRoom(enteredDoor.face) as room;
          // console.log(
          //   `In ${currentRoom} entered in the ${enteredDoor.face} and the next Room is ${nextRoom} `
          // );
          // console.log(doors);

          let resetY;
          if (enteredDoor.face === "door-face-top") {
            if (roomSize) {
              resetY =
                roomSize.height -
                ((DOOR_SAMPLE.height + WALLS_WIDTH) * 2 +
                  playerAttributes.height);
            } else {
              resetY = 100;
            }
          } else if (enteredDoor.face === "door-face-bottom") {
            resetY = (DOOR_SAMPLE.height + WALLS_WIDTH) * 2;
          } else {
            if (roomSize) {
              resetY = roomSize.height / 2;
            } else {
              resetY = 100;
            }
          }
          setcurrentRoom(nextRoom);
          setplayerSpritePosition((prev) => (prev === 0 ? 1 : 0));
          setplayerAttributes((prev) => ({
            ...prev,
            x: getCurrentX,
            y: resetY,
          }));
        } else {
          const { x: constrainedX, y: constrainedY } = checkBoundaries(
            getCurrentX,
            getCurrentY
          );
          setplayerSpritePosition((prev) => (prev === 0 ? 1 : 0));
          setplayerAttributes((prev) => ({
            ...prev,
            x: constrainedX,
            y: constrainedY,
          }));
        }
      }, 100);
    }
    return () => {
      if (playerInterval) {
        clearInterval(playerInterval);
      }
    };
  }, [isPlayerMovement, DirectionPlayer, playerAttributes, roomSize]);

  // [c] Render
  return (
    <div ref={DUNGEON_REF} className={`${style.dungeon}`}>
      <Rooms room={currentRoom} />
      <Player
        orientation={playerOrientation}
        attributes={playerAttributes}
        spriteSelector={playerSpritePosition}
        ref={PLAYER_REF}
      />
      <Doors doors={doors} />
      <Dpad
        actionFunction={getAction}
        movementFunction={setCoordsDirection}
        orientationFunction={setOrientation}
        changeIsplayerMovement={setisPlayerMovement}
      />
    </div>
  );
}
