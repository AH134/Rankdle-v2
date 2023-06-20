import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import HeaderButton from "./HeaderButton/HeaderButton";
import Sidebar from "../Sidebar/Sidebar";
import Hamburger from "hamburger-react";

const Header = ({ setActivePage, activePage, setModalOpen }) => {
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
                  setModalOpen("about");
                }}
              />
              <HeaderButton
                src={"../images/header/settings-icon.svg"}
                alt={"settings-icon"}
                width={"25px"}
                handleClick={() => {
                  setModalOpen("settings");
                }}
              />
              <HeaderButton
                src={"../images/header/account-icon.svg"}
                alt={"account-icon"}
                width={"30px"}
                handleClick={() => {
                  setModalOpen("account");
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
                  setModalOpen("about");
                }}
              />
              <HeaderButton
                src={"../images/header/settings-icon.svg"}
                alt={"settings-icon"}
                width={"25px"}
                hoverText={"settings"}
                handleClick={() => {
                  setModalOpen("settings");
                }}
              />
              <HeaderButton
                src={"../images/header/account-icon.svg"}
                alt={"account-icon"}
                width={"30px"}
                hoverText={"Account"}
                handleClick={() => {
                  setModalOpen("account");
                }}
              />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
