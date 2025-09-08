import { rectAttribute } from "../types";
import styles from "./doors.module.css";
interface Props {
  attributes: rectAttribute;
}
const Door = ({ attributes }: Props) => {
  return (
    <div
      style={{
        top: `${attributes.y}px`,
        left: `${attributes.x}px`,
        width: `${attributes.width}px`,
        height: `${attributes.height}px`,
      }}
      className={styles.door}
    ></div>
  );
};
export default Door;
