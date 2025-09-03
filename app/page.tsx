import Dungeon from "./dungeon/dungeon";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Dungeon />
    </main>
  );
}
