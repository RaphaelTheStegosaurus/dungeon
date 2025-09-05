"use client";
import React, { useState } from "react";
import styles from "./dpad.module.css";
import { playerOrientation } from "../types";
interface Props {
  movementFunction: (xCoord: number, yCoord: number) => void;
  actionFunction: () => void;
  orientationFunction: (_orientation: playerOrientation) => void;
}

export default function Dpad({
  movementFunction,
  actionFunction,
  orientationFunction,
}: Props) {
  const [isPressedSelect, setisPressedSelect] = useState(false);
  return (
    <div className={styles.dpad}>
      <button
        className={`${styles.dpadButton} ${styles.dpadUp}`}
        onClick={() => {
          movementFunction(0, -1);
          orientationFunction("NORTH");
        }}
      >
        ⏶
      </button>
      <button
        className={`${styles.dpadButton} ${styles.dpadRight}`}
        onClick={() => {
          movementFunction(1, 0);
          orientationFunction("EAST");
        }}
      >
        ⏵
      </button>
      <button
        className={`${styles.dpadButton} ${styles.dpadDown}`}
        onClick={() => {
          movementFunction(0, 1);
          orientationFunction("SOUTH");
        }}
      >
        ⏷
      </button>
      <button
        className={`${styles.dpadButton} ${styles.dpadLeft}`}
        onClick={() => {
          movementFunction(-1, 0);
          orientationFunction("WEST");
        }}
      >
        ⏴
      </button>
      <button
        className={`${styles.dpadButton} ${styles.dpadSelect}`}
        onClick={() => actionFunction()}
        onMouseDown={() => setisPressedSelect(true)}
        onMouseUp={() => setisPressedSelect(false)}
      >
        {isPressedSelect ? "⬢" : "⬡"}
      </button>
    </div>
  );
}

// ⬡
// ⬢
