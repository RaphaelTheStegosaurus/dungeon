"use client";
import { useEffect, useRef, useState } from "react";
import style from "./dungeon.module.css";
import Player from "./player/player";
import Rooms from "./rooms/rooms";
import Dpad from "./dpad/dpad";
import { playerOrientation, rectAttribute, SpritePosition } from "./types";
export default function Dungeon() {
  //[c] React Variables
  const PLAYER_REF = useRef(null);
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
  //[c] Const
  const PLAYER_VELOCITY = 20;
  //[c] functions
  const setMovement = (xCoord: number, yCoord: number) => {
    const getCurrentX = playerAttributes.x + xCoord * PLAYER_VELOCITY;
    const getCurrentY = playerAttributes.y + yCoord * PLAYER_VELOCITY;
    setplayerAttributes({
      ...playerAttributes,
      x: getCurrentX,
      y: getCurrentY,
    });
  };
  const setOrientation = (_orientation: playerOrientation) => {
    setplayerOrientation(_orientation);
  };
  const getAction = () => {};
  //[c] React Functions
  useEffect(() => {
    setplayerSpritePosition(playerSpritePosition === 0 ? 1 : 0);
    return () => {};
  }, [playerAttributes]);
  // [c] RenderF
  return (
    <div className={`${style.dungeon}`}>
      <Rooms room="room1" />
      <Player
        orientation={playerOrientation}
        attributes={playerAttributes}
        spriteSelector={playerSpritePosition}
        ref={PLAYER_REF}
      />
      <Dpad
        actionFunction={getAction}
        movementFunction={setMovement}
        orientationFunction={setOrientation}
      />
    </div>
  );
}
