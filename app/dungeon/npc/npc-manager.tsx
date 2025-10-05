"use client";
import { playerOrientation, rectAttribute, room } from "../types";
import { useEffect, useState } from "react";
import NPC from "./npc";
interface Props {
  PlayerAttribute: rectAttribute;
  PlayerOrientation: playerOrientation;
  CurrentRoom: room;
  HandleCoords: (_Attributes: rectAttribute) => void;
  HandleCoordsNPC2: (_Attributes: rectAttribute) => void;
  HandleNear: (_Id: number) => void;
}
export default function NPC_Manager({
  PlayerAttribute,
  PlayerOrientation,
  CurrentRoom,
  HandleCoords,
  HandleNear,
  HandleCoordsNPC2,
}: Props) {
  //Atributes
  const [rectAttribute, setRectAttribute] = useState<rectAttribute>({
    width: 50,
    height: 50,
    x: 200,
    y: 100,
  });
  const [CurrentOrientation, setCurrentOrientation] =
    useState<playerOrientation>("SOUTH");
  //NPC2
  const [rectNPC2, setrectNPC2] = useState<rectAttribute>({
    width: 50,
    height: 50,
    x: 300,
    y: 400,
  });
  const [NPC2Orientation, setNPC2Orientation] =
    useState<playerOrientation>("SOUTH");

  const ExtractCenterPoint = (_RectAttributes: rectAttribute) => {
    const y = _RectAttributes.y + _RectAttributes.height / 2;
    const x = _RectAttributes.x + _RectAttributes.width / 2;
    return { x, y };
  };
  const CalculatingDistance = (
    _PlayerAttributes: rectAttribute,
    _NPCAttributes: rectAttribute
  ): number => {
    const PlayerPoint = ExtractCenterPoint(_PlayerAttributes);
    const NPCPoint = ExtractCenterPoint(_NPCAttributes);
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
    if (CalculatingDistance(PlayerAttribute, rectAttribute) < 60) {
      HandleNear(6);
      setCurrentOrientation(SetChangeOrientation());
    } else if (CalculatingDistance(PlayerAttribute, rectNPC2) < 60) {
      HandleNear(3);
      setNPC2Orientation(SetChangeOrientation());
    } else {
      HandleNear(0);
      setCurrentOrientation("SOUTH");
      setNPC2Orientation("SOUTH");
    }
  }, [PlayerAttribute, PlayerOrientation]);
  useEffect(() => {
    HandleCoords(rectAttribute);
    HandleCoordsNPC2(rectNPC2);
  }, [rectAttribute, rectNPC2]);
  return (
    <>
      <NPC id={6} attributes={rectAttribute} orientation={CurrentOrientation} />
      <NPC id={3} attributes={rectNPC2} orientation={NPC2Orientation} />
    </>
  );
}
