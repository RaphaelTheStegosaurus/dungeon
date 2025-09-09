"use client";
import { useEffect, useRef, useState } from "react";
import style from "./dungeon.module.css";
import Player from "./player/player";
import Rooms from "./rooms/rooms";
import Dpad from "./dpad/dpad";
import {
  Coord,
  DoorAttribute,
  playerOrientation,
  rectAttribute,
  room,
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
  const [doors, setdoors] = useState<DoorAttribute[]>([
    { ...DOOR_SAMPLE, face: "door-face-bottom" },
    { ...DOOR_SAMPLE, face: "door-hided-bottom" },
    { ...DOOR_SAMPLE, face: "door-hided-bottom" },
  ]);
  const [roomSize, setroomSize] = useState<Sizes | null>(null);
  const [currentRoom, setcurrentRoom] = useState<room>("room1");
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
      const newDoors = doors.map((door) => {
        let newY: number;
        let newX: number = roomSize.width / 2 - door.width / 2;
        switch (door.face) {
          case "door-hided-top":
            newY = -door.height;
            break;
          case "door-face-top":
            newY = WALLS_WIDTH; 
            break;
          case "door-face-bottom":
            newY = roomSize.height - door.height - WALLS_WIDTH; 
            break;
          case "door-hided-bottom":
            newY = roomSize.height + door.height; 
            break;
          default:
            newY = door.y;
            break;
        }
        return {
          ...door,
          y: newY,
          x: newX,
        };
      });
      setdoors(newDoors);
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
