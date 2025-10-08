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
  SPRITE_FRAME_DELAY,
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
  //[c] Refs
  const PLAYER_REF = useRef<HTMLDivElement>(null);
  const DUNGEON_REF = useRef<HTMLDivElement>(null);
  const SPRITE_FRAME_COUNT_REF = useRef(0);
  const REQUEST_REF = useRef<number | null>(null);
  // [c] States
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
  const [NPCNear, setNPCNear] = useState<NPC_Id | -1>(-1);
  const HandleIsNearNPC = useCallback((_id: NPC_Id | -1) => {
    setNPCNear(_id);
  }, []);
  const [ListOfCoordsOfNPC, setListOfCoordsOfNPC] = useState<rectAttribute[]>(
    []
  );
  //[c] Functions Setter States
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
  const setterOfListOfCoordsByNPC = useCallback((List: rectAttribute[]) => {
    setListOfCoordsOfNPC(List);
  }, []);
  //[c] Functions
  const GetDoorRePosition = (_Doors: DoorAttribute[], _RoomSize: Sizes) => {
    const newDoors = _Doors.map((door, index) => {
      const newFace: DoorFace = SETS_OF_FACES_BY_ROOM[currentRoom][index];
      const newY: number = returnDoorPositionY(newFace, _RoomSize);
      const newX: number = _RoomSize.width / 2 - door.width / 2;
      return {
        ...door,
        face: newFace,
        y: newY,
        x: newX,
      };
    });
    return newDoors;
  };
  const handleResize = () => {
    if (DUNGEON_REF.current) {
      const RoomRect = DUNGEON_REF.current.getBoundingClientRect();
      const SizeRoom = { width: RoomRect.width, height: RoomRect.height };
      setroomSize(SizeRoom);
    }
  };
  const calculateResetY = (
    enteredDoorFace: DoorFace,
    roomSize: Sizes | null,
    playerAttributes: rectAttribute
  ) => {
    const DEFAULT_Y = 100;
    if (!roomSize) return DEFAULT_Y;
    if (enteredDoorFace === "door-face-top") {
      return (
        roomSize.height -
        ((DOOR_SAMPLE.height + WALLS_WIDTH) * 2 + playerAttributes.height)
      );
    } else if (enteredDoorFace === "door-face-bottom") {
      return (DOOR_SAMPLE.height + WALLS_WIDTH) * 2;
    } else {
      return roomSize.height / 2;
    }
  };
  const handleRoomChange = useCallback(
    (
      enteredDoorFace: DoorFace,
      currentRoom: room,
      roomSize: Sizes | null,
      playerAttributes: rectAttribute,
      getCurrentX: number
    ) => {
      setisPlayerMovement(false);
      const nextRoom = changeRoom(enteredDoorFace, currentRoom) as room;
      const resetY = calculateResetY(
        enteredDoorFace,
        roomSize,
        playerAttributes
      );
      setcurrentRoom(nextRoom);
      setplayerSpritePosition((prev) => (prev === 0 ? 1 : 0));
      setplayerAttributes((prev) => ({
        ...prev,
        x: getCurrentX,
        y: resetY,
      }));
    },
    [
      setisPlayerMovement,
      setcurrentRoom,
      setplayerSpritePosition,
      setplayerAttributes,
    ]
  );
  const handleRegularMovement = useCallback(
    (
      getCurrentX: number,
      getCurrentY: number,
      playerAttributes: rectAttribute,
      roomSize: Sizes | null,
      ListOfCoordsOfNPC: rectAttribute[]
    ) => {
      let { x: constrainedX, y: constrainedY } = checkBoundaries(
        getCurrentX,
        getCurrentY,
        playerAttributes,
        roomSize ? roomSize : { height: 400, width: 600 }
      );
      if (ListOfCoordsOfNPC.length > 0) {
        ListOfCoordsOfNPC.forEach((npcCoords) => {
          const constrainedPlayerRect: rectAttribute = {
            x: constrainedX,
            y: constrainedY,
            width: playerAttributes.width,
            height: playerAttributes.height,
          };
          const newBoundaries = CheckObjectBoundaries(
            constrainedPlayerRect,
            npcCoords
          );
          constrainedX = newBoundaries.x;
          constrainedY = newBoundaries.y;
        });
      }
      SPRITE_FRAME_COUNT_REF.current += 1;
      if (SPRITE_FRAME_COUNT_REF.current >= SPRITE_FRAME_DELAY) {
        setplayerSpritePosition((prev) => (prev === 0 ? 1 : 0));
        SPRITE_FRAME_COUNT_REF.current = 0;
      }
      setplayerAttributes((prev) => ({
        ...prev,
        x: constrainedX,
        y: constrainedY,
      }));
    },
    [setplayerSpritePosition, setplayerAttributes]
  );

  const gameLoop = useCallback(() => {
    const newX = playerAttributes.x + DirectionPlayer.x * PLAYER_VELOCITY;
    const newY = playerAttributes.y + DirectionPlayer.y * PLAYER_VELOCITY;
    const playerRect = {
      x: newX,
      y: newY,
      width: playerAttributes.width,
      height: playerAttributes.height,
    };
    const enteredDoor = checkIfPlayerEnteringTheDoor(playerRect, doors);
    if (enteredDoor) {
      handleRoomChange(
        enteredDoor.face,
        currentRoom,
        roomSize,
        playerAttributes,
        newX
      );
    } else {
      handleRegularMovement(
        newX,
        newY,
        playerAttributes,
        roomSize,
        ListOfCoordsOfNPC
      );
      if (isPlayerMovement) {
        REQUEST_REF.current = requestAnimationFrame(gameLoop);
      }
    }
  }, [
    isPlayerMovement,
    DirectionPlayer,
    playerAttributes,
    roomSize,
    doors,
    currentRoom,
    ListOfCoordsOfNPC,
    handleRoomChange,
    handleRegularMovement,
  ]);

  //[c] useEffects and useLayoutEffects
  useLayoutEffect(() => {
    handleResize();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (roomSize) {
      setdoors((prevDoors) => GetDoorRePosition(prevDoors, roomSize));
    }
  }, [roomSize, currentRoom]);

  useEffect(() => {
    if (isPlayerMovement) {
      REQUEST_REF.current = requestAnimationFrame(gameLoop);
    } else if (REQUEST_REF.current != null) {
      cancelAnimationFrame(REQUEST_REF.current);
      REQUEST_REF.current = null;
    }
    return () => {
      if (REQUEST_REF.current) {
        cancelAnimationFrame(REQUEST_REF.current);
      }
    };
  }, [isPlayerMovement, gameLoop]);

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
        <Dialog nearValue={NPCNear} onClose={closeDialogBox} />
      ) : (
        ""
      )}
    </div>
  );
}
