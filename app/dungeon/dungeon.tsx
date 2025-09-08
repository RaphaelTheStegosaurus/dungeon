"use client";
import { useEffect, useRef, useState } from "react";
import style from "./dungeon.module.css";
import Player from "./player/player";
import Rooms from "./rooms/rooms";
import Dpad from "./dpad/dpad";
import {
  Coord,
  playerOrientation,
  rectAttribute,
  Sizes,
  SpritePosition,
} from "./types";
export default function Dungeon() {
  //[c] React Variables
  const PLAYER_REF = useRef(null);
  const DUNGEON_REF = useRef(null);
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
  const [doors, setdoors] = useState<rectAttribute[]>(); //[ ]doors
  const [roomSize, setroomSize] = useState<Sizes>();
  //[c] Const
  const PLAYER_VELOCITY = 20;
  const WALLS_WIDTH = 20;
  //[c] functions
  const setCoordsDirection = (xCoord: number, yCoord: number) => {
    setDirectionPlayer({ x: xCoord, y: yCoord });
  };
  const setOrientation = (_orientation: playerOrientation) => {
    setplayerOrientation(_orientation);
  };
  const checkBoundaries = (newX: number, newY: number) => {
    if (!roomSize) return { x: newX, y: newY };
    const minX = 0 + WALLS_WIDTH;
    const minY = 0 + WALLS_WIDTH;
    const maxX = roomSize.width - playerAttributes.width - WALLS_WIDTH;
    const maxY = roomSize.height - playerAttributes.height - WALLS_WIDTH;
    // console.log(` x:${minX}< p < ${maxX}, y: ${minY} < p < ${maxY}  `);
    const constrainedX = Math.min(Math.max(newX, minX), maxX);
    const constrainedY = Math.min(Math.max(newY, minY), maxY);
    // console.log(
    //   ` x:${minX}< ${constrainedX} < ${maxX}, y: ${minY} < ${constrainedY} < ${maxY}  `
    // );
    return { x: constrainedX, y: constrainedY };
  };
  //
  const getAction = () => {};
  //[c] React Functions
  useEffect(() => {
    if (DUNGEON_REF.current) {
      const RoomRect = (
        DUNGEON_REF.current as HTMLDivElement
      ).getBoundingClientRect();
      setroomSize({ width: RoomRect.width, height: RoomRect.height });
    }
  }, []);
  useEffect(() => {
    let playerInterval: NodeJS.Timeout;
    if (isPlayerMovement) {
      let getCurrentX = playerAttributes.x;
      let getCurrentY = playerAttributes.y;
      playerInterval = setInterval(() => {
        getCurrentX += DirectionPlayer.x * PLAYER_VELOCITY;
        getCurrentY += DirectionPlayer.y * PLAYER_VELOCITY;
        // console.log(`x:${getCurrentX},y:${getCurrentY}`);
        const { x: constrainedX, y: constrainedY } = checkBoundaries(
          getCurrentX,
          getCurrentY
        );
        setplayerSpritePosition((prev) => (prev === 0 ? 1 : 0));
        // setplayerAttributes({
        //   ...playerAttributes,
        //   x: getCurrentX,
        //   y: getCurrentY,
        // });
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
  // [c] RenderF
  return (
    <div ref={DUNGEON_REF} className={`${style.dungeon}`}>
      <Rooms room="room1" />
      <Player
        orientation={playerOrientation}
        attributes={playerAttributes}
        spriteSelector={playerSpritePosition}
        ref={PLAYER_REF}
      />
      <Dpad
        actionFunction={getAction}
        movementFunction={setCoordsDirection}
        orientationFunction={setOrientation}
        changeIsplayerMovement={setisPlayerMovement}
      />
    </div>
  );
}
