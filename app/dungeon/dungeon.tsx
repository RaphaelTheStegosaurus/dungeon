"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import style from "./dungeon.module.css";
import Player from "./player/player";
import Rooms from "./rooms/rooms";
import Dpad from "./dpad/dpad";
import {
  Coord,
  DoorAttribute,
  DoorFace,
  NPC_Id,
  playerOrientation,
  rectAttribute,
  room,
  Sizes,
  SpritePosition,
} from "./types";

import {
  PLAYER_VELOCITY,
  WALLS_WIDTH,
  DOOR_SAMPLE,
  SETS_OF_FACES_BY_ROOM,
} from "./lib/constants";
import {
  checkIfPlayerEnteringTheDoor,
  checkBoundaries,
  returnDoorPositionY,
  changeRoom,
  CheckObjectBoundaries,
} from "./lib/util";

import Doors from "./doors/doors";
import Dialog from "./dialog/dialog";
import NPC_Manager from "./npc/npc-manager";
import { DIALOGS } from "./lib/npc-data";
export default function Dungeon() {
  //[c] React Variables
  const PLAYER_REF = useRef<HTMLDivElement>(null);
  const DUNGEON_REF = useRef<HTMLDivElement>(null);
  const [playerAttributes, setplayerAttributes] = useState<rectAttribute>({
    x: 50,
    y: 20,
    width: 50,
    height: 50,
  });
  const [playerOrientation, setplayerOrientation] =
    useState<playerOrientation>("SOUTH");
  const [playerSpritePosition, setplayerSpritePosition] =
    useState<SpritePosition>(1);
  const [isPlayerMovement, setisPlayerMovement] = useState(false);
  const [DirectionPlayer, setDirectionPlayer] = useState<Coord>({ x: 0, y: 0 });

  const [currentRoom, setcurrentRoom] = useState<room>("room1");
  const [doors, setdoors] = useState<DoorAttribute[]>([
    { ...DOOR_SAMPLE, face: SETS_OF_FACES_BY_ROOM[currentRoom][0] },
    { ...DOOR_SAMPLE, face: SETS_OF_FACES_BY_ROOM[currentRoom][1] },
    { ...DOOR_SAMPLE, face: SETS_OF_FACES_BY_ROOM[currentRoom][2] },
  ]);

  const [roomSize, setroomSize] = useState<Sizes | null>(null);
  const [isShowDialogBox, setisShowDialogBox] = useState(false);
  //[c] functions
  const setCoordsDirection = useCallback((xCoord: number, yCoord: number) => {
    setDirectionPlayer({ x: xCoord, y: yCoord });
  }, []);
  const setOrientation = (_orientation: playerOrientation) => {
    setplayerOrientation(_orientation);
  };
  const getAction = useCallback(() => {
    setisShowDialogBox(!isShowDialogBox);
  }, [isShowDialogBox]);

  const closeDialogBox = () => {
    setisShowDialogBox(false);
  };
  //[c] NPC Work Area-----------------------------------
  const [OtherColision, setOtherColision] = useState<rectAttribute[]>([]);
  const [NPCNear, setNPCNear] = useState(0);
  const HandleOtherColision = useCallback((_newValues) => {
    setOtherColision(_newValues);
  }, []);
  const HandleIsNearNPC = useCallback((_id: NPC_Id) => {
    setNPCNear(_id);
  }, []);

  const [NPCAttribute, setNPCAttribute] = useState<rectAttribute>();
  const [NPC2, setNPC2] = useState<rectAttribute>();
  const HandleNPCAttributes = useCallback((_newValues: rectAttribute) => {
    setNPCAttribute(_newValues);
  }, []);
  const HandleNPC2 = useCallback((_newValues: rectAttribute) => {
    setNPC2(_newValues);
  }, []);
  //----------------------------------------------------------------------
  const [ListOfCoordsOfNPC, setListOfCoordsOfNPC] = useState<rectAttribute[]>(
    []
  );
  const setterOfListOfCoordsByNPC = useCallback((List: rectAttribute[]) => {
    setListOfCoordsOfNPC(List);
  }, []);
  //-------------------------------------------------------
  //[c] React Functions
  useLayoutEffect(() => {
    if (DUNGEON_REF.current) {
      const RoomRect = DUNGEON_REF.current.getBoundingClientRect();
      setroomSize({ width: RoomRect.width, height: RoomRect.height });
    }
  }, []);

  useEffect(() => {
    if (roomSize) {
      setdoors((prevDoors) => {
        const newDoors = prevDoors.map((door, index) => {
          const newFace: DoorFace = SETS_OF_FACES_BY_ROOM[currentRoom][index];
          const newY: number = returnDoorPositionY(newFace, roomSize);
          const newX: number = roomSize.width / 2 - door.width / 2;
          return {
            ...door,
            face: newFace,
            y: newY,
            x: newX,
          };
        });
        return newDoors;
      });
    }
  }, [roomSize, currentRoom]);

  useEffect(() => {
    let playerInterval: NodeJS.Timeout;
    if (isPlayerMovement) {
      let getCurrentX = playerAttributes.x;
      let getCurrentY = playerAttributes.y;
      playerInterval = setInterval(() => {
        getCurrentX += DirectionPlayer.x * PLAYER_VELOCITY;
        getCurrentY += DirectionPlayer.y * PLAYER_VELOCITY;

        const playerRect: rectAttribute = {
          x: getCurrentX,
          y: getCurrentY,
          width: playerAttributes.width,
          height: playerAttributes.height,
        };
        const enteredDoor = checkIfPlayerEnteringTheDoor(playerRect, doors);

        if (enteredDoor) {
          setisPlayerMovement(false);
          let nextRoom = changeRoom(enteredDoor.face, currentRoom) as room;
          let resetY;
          if (enteredDoor.face === "door-face-top") {
            if (roomSize) {
              resetY =
                roomSize.height -
                ((DOOR_SAMPLE.height + WALLS_WIDTH) * 2 +
                  playerAttributes.height);
            } else {
              resetY = 100;
            }
          } else if (enteredDoor.face === "door-face-bottom") {
            resetY = (DOOR_SAMPLE.height + WALLS_WIDTH) * 2;
          } else {
            if (roomSize) {
              resetY = roomSize.height / 2;
            } else {
              resetY = 100;
            }
          }
          setcurrentRoom(nextRoom);
          setplayerSpritePosition((prev) => (prev === 0 ? 1 : 0));
          setplayerAttributes((prev) => ({
            ...prev,
            x: getCurrentX,
            y: resetY,
          }));
        } else {
          let { x: constrainedX, y: constrainedY } = checkBoundaries(
            getCurrentX,
            getCurrentY,
            playerAttributes,
            roomSize ? roomSize : { height: 400, width: 600 }
          );
          if (NPCAttribute && NPC2) {
            constrainedX = CheckObjectBoundaries(playerRect, NPCAttribute).x;
            constrainedY = CheckObjectBoundaries(playerRect, NPCAttribute).y;
            constrainedX = CheckObjectBoundaries(playerRect, NPC2).x;
            constrainedY = CheckObjectBoundaries(playerRect, NPC2).y;
          }
          setplayerSpritePosition((prev) => (prev === 0 ? 1 : 0));
          setplayerAttributes((prev) => ({
            ...prev,
            x: constrainedX,
            y: constrainedY,
          }));
        }
      }, 100);
    }
    return () => {
      if (playerInterval) {
        clearInterval(playerInterval);
      }
    };
  }, [isPlayerMovement, DirectionPlayer, playerAttributes, roomSize]);

  // [c] Render
  return (
    <div ref={DUNGEON_REF} className={`${style.dungeon}`}>
      <Rooms room={currentRoom} />
      <Player
        orientation={playerOrientation}
        attributes={playerAttributes}
        spriteSelector={playerSpritePosition}
        ref={PLAYER_REF}
      />
      <NPC_Manager
        CurrentRoom={currentRoom}
        PlayerAttribute={playerAttributes}
        PlayerOrientation={playerOrientation}
        HandleNear={HandleIsNearNPC}
        HandleListOfCoordsByNPC={setterOfListOfCoordsByNPC}
      />
      <Doors doors={doors} />
      <Dpad
        actionFunction={getAction}
        movementFunction={setCoordsDirection}
        orientationFunction={setOrientation}
        changeIsplayerMovement={setisPlayerMovement}
      />
      {isShowDialogBox ? (
        <Dialog
          characterName={DIALOGS[NPCNear].name}
          text={DIALOGS[NPCNear].text}
          onClose={closeDialogBox}
        />
      ) : (
        ""
      )}
    </div>
  );
}
