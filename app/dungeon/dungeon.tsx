import style from "./dungeon.module.css";
import Player from "./player/player";
import Rooms from "./rooms/rooms";
export default function Dungeon() {
  return (
    <div className={`${style.dungeon}`}>
      <Rooms room="room1"/>
      <Player/>
    </div>
  );
}
