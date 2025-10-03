"use client";
import { playerOrientation, rectAttribute, room } from "../types";
import { useEffect, useState } from "react";
import NPC from "./npc";
interface Props {
  PlayerAttribute: rectAttribute;
  PlayerOrientation: playerOrientation;
  CurrentRoom: room;
  HandleCoords: (_Attributes: rectAttribute) => void;
}
export default function NPC_Manager({
  PlayerAttribute,
  PlayerOrientation,
  CurrentRoom,
  HandleCoords,
}: Props) {
  const [rectAttribute, setRectAttribute] = useState<rectAttribute>({
    width: 50,
    height: 50,
    x: 200,
    y: 100,
  });
  const [CurrentOrientation, setCurrentOrientation] =
    useState<playerOrientation>("SOUTH");
  const ExtractCenterPoint = (_RectAttributes: rectAttribute) => {
    const y = _RectAttributes.y + _RectAttributes.height / 2;
    const x = _RectAttributes.x + _RectAttributes.width / 2;
    return { x, y };
  };
  const CalculatingDistance = (): number => {
    const PlayerPoint = ExtractCenterPoint(PlayerAttribute);
    const NPCPoint = ExtractCenterPoint(rectAttribute);
    const Distance = Math.sqrt(
      Math.pow(PlayerPoint.x - NPCPoint.x, 2) +
        Math.pow(PlayerPoint.y - NPCPoint.y, 2)
    );
    return Distance;
  };
  const SetChangeOrientation = () => {
    const NPCOrientationToPlayer = {
      NORTH: "SOUTH",
      SOUTH: "NORTH",
      EAST: "WEST",
      WEST: "EAST",
    };
    const newOrientation = NPCOrientationToPlayer[PlayerOrientation];
    return newOrientation as playerOrientation;
  };
  useEffect(() => {
    if (CalculatingDistance() < 60) {
      setCurrentOrientation(SetChangeOrientation());
    } else {
      setCurrentOrientation("SOUTH");
    }
  }, [PlayerAttribute, PlayerOrientation]);
  useEffect(() => {
    HandleCoords(rectAttribute);
  }, [rectAttribute]);
  return (
    <>
      <NPC attributes={rectAttribute} orientation={CurrentOrientation} />
    </>
  );
}
