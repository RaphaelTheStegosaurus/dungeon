import { memo } from "react";
import { DoorAttribute, rectAttribute } from "../types";
import Door from "./door";
import React from "react";
interface Props {
  doors: DoorAttribute[];
}
const Doors = ({ doors }: Props) => {
  return (
    <>
      {doors.map((value, index) => {
        let newDoorAttributes: rectAttribute = {
          x: value.x,
          y: value.y,
          height: value.height,
          width: value.width,
        };
        return <Door key={index} attributes={newDoorAttributes} />;
      })}
    </>
  );
};

export default React.memo(Doors);
