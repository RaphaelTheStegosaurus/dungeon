import { LIST_OF_SPRITES } from "../lib/npc-data";
import { NPC_Id, playerOrientation, rectAttribute } from "../types";
import style from "./npc.module.css";
interface Props {
  attributes: rectAttribute;
  orientation: playerOrientation;
  id: NPC_Id;
}
const NPC = ({ attributes, orientation, id }: Props) => {
  const SpritesConfig = {
    NORTH: "50% 0%",
    SOUTH: "0% 0%",
    EAST: "100% 0%",
    WEST: "100% 0%",
  };
  return (
    <div
      className={`${style.npc}`}
      style={{
        width: `${attributes.width}px`,
        height: `${attributes.height}px`,
        top: `${attributes.y}px`,
        left: `${attributes.x}px`,
        backgroundImage: `url(${LIST_OF_SPRITES[id]})`,
        backgroundSize: "300% 100%",
        backgroundPosition: `${SpritesConfig[orientation]}`,
        transform: `scaleX(${orientation === "WEST" ? -1 : 1})`,
      }}
    ></div>
  );
};

export default NPC;
