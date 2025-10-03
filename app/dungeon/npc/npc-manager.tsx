import { playerOrientation, rectAttribute, room } from "../types"

interface Props {
    PlayerAttribute:rectAttribute
    PlayerOrientation:playerOrientation
    CurrentRoom : room
    
}
export default function NPC_Manager() {
  return (
    <div>npc-manager</div>
  )
}
