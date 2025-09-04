import { forwardRef } from "react";
import style from "./player.module.css";
interface Props {
  attributes: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  orientation: "NORTH" | "SOUTH" | "EAST" | "WEST";
  spriteSelector: 0 | 1;
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
