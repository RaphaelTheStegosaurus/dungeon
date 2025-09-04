import { useRef } from "react";
import style from "./dungeon.module.css";
import Player from "./player/player";
import Rooms from "./rooms/rooms";
export default function Dungeon() {
  const PLAYER_REF = useRef(null);
  return (
    <div className={`${style.dungeon}`}>
      <Rooms room="room1" />
      <Player
        orientation="SOUTH"
        attributes={{ x: 50, y: 20, width: 50, height: 50 }}
        spriteSelector={0}
        ref={PLAYER_REF}
      />
    </div>
  );
}
