"use client";
import React, { useState } from "react";
import styles from "./dpad.module.css";
import { playerOrientation } from "../types";
import DpadButton from "./dpadbutton";
interface Props {
  movementFunction: (xCoord: number, yCoord: number) => void;
  actionFunction: () => void;
  orientationFunction: (_orientation: playerOrientation) => void;
  changeIsplayerMovement: (trigger: boolean) => void;
}

export default function Dpad({
  movementFunction,
  actionFunction,
  orientationFunction,
  changeIsplayerMovement,
}: Props) {
  const [isPressedSelect, setisPressedSelect] = useState(false);
  return (
    <div className={styles.dpad}>
      <DpadButton
        direction="dpadUp"
        coords={{ x: 0, y: -1 }}
        orientation="NORTH"
        movementFunction={movementFunction}
        orientationFunction={orientationFunction}
        changeIsplayerMovement={changeIsplayerMovement}
      >
        ⏶
      </DpadButton>
      <DpadButton
        direction="dpadRight"
        coords={{ x: 1, y: 0 }}
        orientation="EAST"
        movementFunction={movementFunction}
        orientationFunction={orientationFunction}
        changeIsplayerMovement={changeIsplayerMovement}
      >
        ⏵
      </DpadButton>
      <DpadButton
        direction="dpadDown"
        coords={{ x: 0, y: 1 }}
        orientation="SOUTH"
        movementFunction={movementFunction}
        orientationFunction={orientationFunction}
        changeIsplayerMovement={changeIsplayerMovement}
      >
        ⏷
      </DpadButton>
      <DpadButton
        direction="dpadLeft"
        coords={{ x: -1, y: 0 }}
        orientation="WEST"
        movementFunction={movementFunction}
        orientationFunction={orientationFunction}
        changeIsplayerMovement={changeIsplayerMovement}
      >
        ⏴
      </DpadButton>

      {/* <button
        className={`${styles.dpadButton} ${styles.dpadUp}`}
        onMouseDown={() => {
          movementFunction(0, -1);
          orientationFunction("NORTH");
          changeIsplayerMovement(true);
        }}
        onMouseUp={() => {
          changeIsplayerMovement(false);
        }}
      >
        ⏶
      </button>
      <button
        className={`${styles.dpadButton} ${styles.dpadRight}`}
        onMouseDown={() => {
          movementFunction(1, 0);
          orientationFunction("EAST");
          changeIsplayerMovement(true);
        }}
        onMouseUp={() => {
          changeIsplayerMovement(false);
        }}
      >
        ⏵
      </button>
      <button
        className={`${styles.dpadButton} ${styles.dpadDown}`}
        onMouseDown={() => {
          movementFunction(0, 1);
          orientationFunction("SOUTH");
          changeIsplayerMovement(true);
        }}
        onMouseUp={() => {
          changeIsplayerMovement(false);
        }}
      >
        ⏷
      </button>
      <button
        className={`${styles.dpadButton} ${styles.dpadLeft}`}
        onMouseDown={() => {
          movementFunction(-1, 0);
          orientationFunction("WEST");
          changeIsplayerMovement(true);
        }}
        onMouseUp={() => {
          changeIsplayerMovement(false);
        }}
      >
        ⏴
      </button> */}

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
