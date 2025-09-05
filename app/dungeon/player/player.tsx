import { forwardRef } from "react";
import style from "./player.module.css";
import { playerOrientation, rectAttribute, SpritePosition } from "../types";
interface Props {
  attributes: rectAttribute;
  orientation: playerOrientation;
  spriteSelector: SpritePosition;
}

const Player = forwardRef(
  ({ attributes, orientation, spriteSelector }: Props, ref) => {
    const SpritesConfig = {
      NORTH: "/walk-t.png",
      SOUTH: "/walk-b.png",
      EAST: "/walk-i.png",
      WEST: "/walk-i.png",
    };
    const SpritePosition = ["0% 0%", "100% 0%"];
    return (
      <div
        className={`${style.player}`}
        style={{
          width: `${attributes.width}px`,
          height: `${attributes.height}px`,
          top: `${attributes.y}px`,
          left: `${attributes.x}px`,
          backgroundImage: `url(${SpritesConfig[orientation]})`,
          backgroundSize: "200% 100%",
          backgroundPosition: SpritePosition[spriteSelector],
          transform: `scaleX(${orientation === "WEST" ? -1 : 1})`,
        }}
      ></div>
    );
  }
);

export default Player;
