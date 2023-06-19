import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import HeaderButton from "./HeaderButton/HeaderButton";
import { Modal } from "../../../components";
import Sidebar from "../Sidebar/Sidebar";
import Hamburger from "hamburger-react";

const About = () => {
  return <div>About Modal</div>;
};
const Settings = () => {
  return <div>Settings Modal</div>;
};
const Account = () => {
  return <div>Account Modal</div>;
};

const Header = ({ setActivePage, activePage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isSidebarOpen, setisSidebarOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Hamburger
            size={25}
            toggle={setisSidebarOpen}
            toggled={isSidebarOpen}
          />
          <Sidebar
            className={`${styles.sidebar} ${
              isSidebarOpen ? styles.active : ""
            }`}
            setActivePage={setActivePage}
            activePage={activePage}
          >
            <ul className={styles.rightSectionInSidbar}>
              <HeaderButton
                type="link"
                to={"/submit"}
                src={"../images/header/submit-icon.svg"}
                alt={"submit"}
                width={"25px"}
                handleClick={() => setActivePage("/submit")}
              />
              <HeaderButton
                src={"../images/header/about-icon.svg"}
                alt={"about-icon"}
                width={"25px"}
                handleClick={() => {
                  setIsModalOpen(true);
                  setModalContent("How to Play");
                }}
              />
              <HeaderButton
                src={"../images/header/settings-icon.svg"}
                alt={"settings-icon"}
                width={"25px"}
                handleClick={() => {
                  setIsModalOpen(true);
                  setModalContent("Settings");
                }}
              />
              <HeaderButton
                src={"../images/header/account-icon.svg"}
                alt={"account-icon"}
                width={"30px"}
                handleClick={() => {
                  setIsModalOpen(true);
                  setModalContent("Account");
                }}
              />
            </ul>
          </Sidebar>
        </div>

        <div className={styles.middleSection}>
          <div>
            <Link className={styles.title} onClick={() => setActivePage("/")}>
              <h1>Rankdle V2</h1>
            </Link>
          </div>
        </div>

        <div className={styles.rightSection}>
          <nav>
            <ul className={styles.navbarList}>
              <HeaderButton
                type="link"
                to={"/submit"}
                src={"../images/header/submit-icon.svg"}
                alt={"submit"}
                width={"25px"}
                hoverText={"Submit Clip"}
                handleClick={() => setActivePage("/submit")}
              />
              <HeaderButton
                src={"../images/header/about-icon.svg"}
                alt={"about-icon"}
                width={"25px"}
                hoverText={"About"}
                handleClick={() => {
                  setIsModalOpen(true);
                  setModalContent("How to Play");
                }}
              />
              <HeaderButton
                src={"../images/header/settings-icon.svg"}
                alt={"settings-icon"}
                width={"25px"}
                hoverText={"settings"}
                handleClick={() => {
                  setIsModalOpen(true);
                  setModalContent("Settings");
                }}
              />
              <HeaderButton
                src={"../images/header/account-icon.svg"}
                alt={"account-icon"}
                width={"30px"}
                hoverText={"Account"}
                handleClick={() => {
                  setIsModalOpen(true);
                  setModalContent("Account");
                }}
              />
            </ul>
          </nav>
        </div>
      </div>

      <Modal
        context={modalContent}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        {modalContent === "about" ? (
          <About />
        ) : modalContent === "account" ? (
          <Account />
        ) : (
          <Settings />
        )}
      </Modal>
    </>
  );
};

export default Header;
