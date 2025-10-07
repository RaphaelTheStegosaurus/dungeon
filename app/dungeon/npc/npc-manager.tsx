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
  const NPCManager = useCallback(() => {
    const currentNPC = NPC_BY_ROOM[CurrentRoom] as NPC_Id[];
    let ListRectOfNPC = currentNPC.map((Value) => {
      return NPC_ATRIBUTES[Value];
    });
    setListOfNPCId(currentNPC);
    setListOfNPC(ListRectOfNPC);
    let ListOrientationOfNPC: playerOrientation[] = new Array(
      currentNPC.length
    ).fill("SOUTH");
    setListOrientationNPC(ListOrientationOfNPC);
  }, [ListOfNPC, ListOrientationNPC]);
  const ResetListOrientation = useCallback(() => {
    const ListLenght = ListOrientationNPC.length;
    setListOrientationNPC(new Array(ListLenght).fill("SOUTH"));
  }, [ListOrientationNPC]);
  const SendingListOfNPC = useCallback(() => {
    HandleListOfCoordsByNPC(ListOfNPC);
  }, [ListOfNPC]);

  useEffect(() => {
    NPCManager();
    SendingListOfNPC();
    if (ListOfNPC.length > 0) {
      ListOfNPC.forEach((Value, Index) => {
        if (CalculatingDistance(PlayerAttribute, Value) < 60) {
          HandleNear(ListOfNPCId[Index]);
          const NewListOfOrientation = ListOrientationNPC.map(
            (_Value, _Index) => {
              if (Index === _Index) {
                return SetChangeOrientation(PlayerOrientation);
              } else {
                return _Value;
              }
            }
          );
          setListOrientationNPC(NewListOfOrientation);
        }
      });
    } else {
      HandleNear(-1);
      ResetListOrientation();
    }
  }, [PlayerAttribute, PlayerOrientation]);
  useLayoutEffect(() => {
    NPCManager();
  }, []);

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
