import styles from "./Root.module.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Header />
      </header>
      <Sidebar className={styles.sidebar} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
