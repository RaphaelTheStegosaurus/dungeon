import { playerOrientation, rectAttribute } from "../types";
import style from "./npc.module.css";
interface Props {
  attributes: rectAttribute;
  orientation: playerOrientation;
}
export const NPC = ({ attributes, orientation }: Props) => {
  const TemporalUrl = "/npc/npc-06-idle.png";
  const SpritesConfig = {
    NORTH: "0% 0%",
    SOUTH: "50% 0%",
    EAST: "100% 0%",
    WEST: "100% 0%",
  };
  console.log(`Player: ${orientation}, NPC: ${SpritesConfig[orientation]}`);

  return (
    <div
      className={`${style.npc}`}
      style={{
        width: `${attributes.width}px`,
        height: `${attributes.height}px`,
        top: `${attributes.y}px`,
        left: `${attributes.x}px`,
        backgroundImage: `url(${TemporalUrl})`,
        backgroundSize: "300% 100%",
        backgroundPosition: `${SpritesConfig[orientation]}`,
        transform: `scaleX(${orientation === "WEST" ? 1 : -1})`,
      }}
    ></div>
  );
};
