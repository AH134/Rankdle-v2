import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import useActivePage from "../../hooks/useActivePage";

const Root = () => {
  const [activePage, setActivePage] = useActivePage();

  return (
    <>
      <header className={styles.header}>
        <Header setActivePage={setActivePage} activePage={activePage} />
      </header>

      <div className={styles.mainContainer}>
        <Sidebar
          className={styles.sidebar}
          setActivePage={setActivePage}
          activePage={activePage}
        ></Sidebar>

        <main className={styles.main}>
          <Outlet />
        </main>

        <div className={styles.stats}>stats side</div>
      </div>
    </>
  );
};

export default Root;
