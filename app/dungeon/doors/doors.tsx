import { DoorAttribute, rectAttribute } from "../types";
import Door from "./door";

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

export default Doors;
