import React, { ReactNode } from "react";
import { playerOrientation } from "../types";
import styles from "./dpad.module.css";

interface Props {
  direction: string;
  coords: { x: number; y: number };
  orientation: playerOrientation;
  movementFunction: (x: number, y: number) => void;
  orientationFunction: (_orientation: playerOrientation) => void;
  changeIsplayerMovement: (trigger: boolean) => void;
  children: ReactNode;
}

const Dpadbutton: React.FC<Props> = ({
  direction,
  coords,
  orientation,
  movementFunction,
  orientationFunction,
  changeIsplayerMovement,
  children,
}) => {
  const handleInteractionStart = () => {
    movementFunction(coords.x, coords.y);
    orientationFunction(orientation);
    changeIsplayerMovement(true);
  };

  const handleInteractionEnd = () => {
    changeIsplayerMovement(false);
  };
  return (
    <button
      className={`${styles.dpadButton} ${styles[direction]}`}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      {children}
    </button>
  );
};
export default Dpadbutton;
