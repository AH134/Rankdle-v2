import { Outlet } from "react-router-dom";
import { Modal, AboutPanel, SettingsPanel } from "../../components";
import styles from "./Root.module.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import useActivePage from "../../hooks/useActivePage";
import useModal from "../../hooks/useModal";

const Root = () => {
  const [activePage, setActivePage] = useActivePage();
  const [isModalOpen, modalContent, setModalOpen, setModalClose] = useModal();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header
          setActivePage={setActivePage}
          activePage={activePage}
          setModalOpen={setModalOpen}
        />
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

        <aside className={styles.stats}>stats side</aside>
      </div>
      <Modal isOpen={isModalOpen} handleModalClose={setModalClose}>
        {modalContent === "about" ? (
          <AboutPanel />
        ) : modalContent === "account" ? (
          <div>hello</div>
        ) : (
          <SettingsPanel />
        )}
      </Modal>
    </div>
  );
};

export default Root;
