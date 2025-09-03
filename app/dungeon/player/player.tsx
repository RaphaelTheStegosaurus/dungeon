import style from "./player.module.css";
interface Props {}

export default function Player({}: Props) {
  function SetOrientation() {}
  function SetSize() {}
  function SetPosition() {}
  function SetSprite() {}
  return (
    <div
      className={`${style.player}`}
      style={{
        width: "30px",
        height: "30px",
        top: "30px",
        left: "30px",
        backgroundImage: `url("/walk-b.png")`,
        backgroundSize: "200% 100%",
      }}
    ></div>
  );
}
