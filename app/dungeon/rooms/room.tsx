interface Props {}
import React from "react";
import style from "./room.module.css";
function Room({}: Props) {
  return <div className={`${style.room}`}></div>;
}

export default React.memo(Room);
// dejar abierto a el cambio de background desde una props
