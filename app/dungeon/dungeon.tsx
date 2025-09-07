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
  const [doors, setdoors] = useState<rectAttribute[]>();
  const [roomSize, setroomSize] = useState<Sizes>();
  //[c] Const
  const PLAYER_VELOCITY = 20;
  //[c] functions
  const setCoordsDirection = (xCoord: number, yCoord: number) => {
    setDirectionPlayer({ x: xCoord, y: yCoord });
  };
  const setOrientation = (_orientation: playerOrientation) => {
    setplayerOrientation(_orientation);
  };
  const getAction = () => {};
  //[c] React Functions
  useEffect(() => {
    let playerInterval: NodeJS.Timeout;
    if (DUNGEON_REF.current) {
      console.log(DUNGEON_REF.current);
    }
    if (isPlayerMovement) {
      let getCurrentX = playerAttributes.x;
      let getCurrentY = playerAttributes.y;
      playerInterval = setInterval(() => {
        getCurrentX += DirectionPlayer.x * PLAYER_VELOCITY;
        getCurrentY += DirectionPlayer.y * PLAYER_VELOCITY;
        // console.log(`x:${getCurrentX},y:${getCurrentY}`);
        setplayerSpritePosition((prev) => (prev === 0 ? 1 : 0));
        setplayerAttributes({
          ...playerAttributes,
          x: getCurrentX,
          y: getCurrentY,
        });
      }, 100);
    }
    return () => {
      if (playerInterval) {
        clearInterval(playerInterval);
      }
    };
  }, [isPlayerMovement, DirectionPlayer]);
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
