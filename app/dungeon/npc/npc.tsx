import { playerOrientation, rectAttribute } from "../types";
import style from "./npc.module.css";
interface Props {
  attributes: rectAttribute;
  orientation: playerOrientation;
  id: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
const NPC = ({ attributes, orientation, id }: Props) => {
  const TemporalUrl = "/npc/npc-06-idle.png";
  const LIST_OF_SPRITES = [
    "/npc/npc-01-idle.png",
    "/npc/npc-02-idle.png",
    "/npc/npc-03-idle.png",
    "/npc/npc-04-idle.png",
    "/npc/npc-05-idle.png",
    "/npc/npc-06-idle.png",
    "/npc/npc-07-idle.png",
  ];
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
