interface Props {
  room: "room1" | "room2" | "room3" | "room4";
}
import React from "react";
import Room from "./room";
import style from "./room.module.css";
function Rooms({ room }: Props) {
  const roomPosition = {
    room1: "0%",
    room2: "-100%",
    room3: "-200%",
    room4: "-300%",
  };
  return (
    <div className={style.map} style={{ top: `${roomPosition[room]}` }}>
      <Room />
      <Room />
      <Room />
      <Room />
    </div>
  );
}
export default React.memo(Rooms);
