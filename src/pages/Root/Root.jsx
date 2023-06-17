import styles from "./Root.module.css";
import { Header } from "../../components/";

const Root = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Header />
      </header>
      <aside className={styles.sidebar}></aside>
      <main className={styles.hero}> the hero/main container</main>
    </div>
  );
};

export default Root;
