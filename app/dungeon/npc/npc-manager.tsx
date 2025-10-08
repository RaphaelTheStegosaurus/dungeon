"use client";
import { NPC_Id, playerOrientation, rectAttribute, room } from "../types";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import NPC from "./npc";
import { NPC_ATRIBUTES, NPC_BY_ROOM } from "../lib/npc-data";
interface Props {
  PlayerAttribute: rectAttribute;
  PlayerOrientation: playerOrientation;
  CurrentRoom: room;
  HandleNear: (_Id: NPC_Id | -1) => void;
  HandleListOfCoordsByNPC: (_List: rectAttribute[]) => void;
}
export default function NPC_Manager({
  PlayerAttribute,
  PlayerOrientation,
  CurrentRoom,
  HandleNear,
  HandleListOfCoordsByNPC,
}: Props) {
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
  const SetChangeOrientation = (_PlayerOrientation: playerOrientation) => {
    const NPCOrientationToPlayer = {
      NORTH: "SOUTH",
      SOUTH: "NORTH",
      EAST: "WEST",
      WEST: "EAST",
    };
    const newOrientation = NPCOrientationToPlayer[_PlayerOrientation];
    return newOrientation as playerOrientation;
  };
  const [ListOfNPCId, setListOfNPCId] = useState<NPC_Id[]>([]);
  const [ListOfNPC, setListOfNPC] = useState<rectAttribute[]>([]);
  const [ListOrientationNPC, setListOrientationNPC] = useState<
    playerOrientation[]
  >([]);

  const NPCManager = (room: room) => {
    const currentNPC = NPC_BY_ROOM[room] as NPC_Id[];
    const ListRectOfNPC = currentNPC.map((Value) => NPC_ATRIBUTES[Value]);
    return {
      npcIds: currentNPC,
      npcRects: ListRectOfNPC,
    };
  };

  const ResetListOrientation = useCallback(() => {
    const ListLenght = ListOrientationNPC.length;
    setListOrientationNPC(new Array(ListLenght).fill("SOUTH"));
    HandleNear(-1);
  }, [ListOrientationNPC]);
  const SendingListOfNPC = useCallback(() => {
    HandleListOfCoordsByNPC(ListOfNPC);
  }, [ListOfNPC]);

  useEffect(() => {
    const { npcIds, npcRects } = NPCManager(CurrentRoom);
    setListOfNPCId(npcIds);
    setListOfNPC(npcRects);
    const initialOrientations: playerOrientation[] = new Array(
      npcIds.length
    ).fill("SOUTH");
    setListOrientationNPC(initialOrientations);
    HandleListOfCoordsByNPC(npcRects);
    HandleNear(-1);
  }, [CurrentRoom, HandleListOfCoordsByNPC, HandleNear]);

  useEffect(() => {
    let nearestNPCId: NPC_Id | -1 = -1;
    if (ListOfNPC.length > 0) {
      setListOrientationNPC((prevListOrientation) => {
        let newOrientationList = [...prevListOrientation];
        ListOfNPC.forEach((npcAttributes, Index) => {
          const distance = CalculatingDistance(PlayerAttribute, npcAttributes);
          const npcId = ListOfNPCId[Index];
          if (distance < 60) {
            nearestNPCId = npcId;
            newOrientationList[Index] = SetChangeOrientation(PlayerOrientation);
          } else {
            newOrientationList[Index] = "SOUTH";
          }
        });
        return newOrientationList;
      });
    }
    HandleNear(nearestNPCId);
  }, [PlayerAttribute, PlayerOrientation, ListOfNPC, ListOfNPCId, HandleNear]);

  return (
    <>
      {ListOfNPCId.map((Value, Index) => {
        return (
          <NPC
            key={Index}
            id={Value}
            attributes={ListOfNPC[Index]}
            orientation={ListOrientationNPC[Index]}
          />
        );
      })}
    </>
  );
}
