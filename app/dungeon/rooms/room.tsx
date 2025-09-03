interface Props  {}
import style from "./room.module.css";
export default function Room({}: Props) {
  return (
    <div className={`${style.room}`}></div>
  )
}
// dejar abierto a el cambio de background desde una props