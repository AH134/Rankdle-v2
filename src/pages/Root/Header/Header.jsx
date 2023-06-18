import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import HeaderNavbar from "./HeaderNavbar/HeaderNavbar";
import HeaderButton from "./HeaderButton/HeaderButton";
import { Modal } from "../../../components";
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

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.hamburgerMenu}>
          <Hamburger size={25} />
        </div>

        <div>
          <Link className={styles.title}>
            <h1>Rankdle V2</h1>
          </Link>
        </div>

        <HeaderNavbar>
          <HeaderButton
            type="link"
            iconName={"submit"}
            iconSize={"25px"}
            hoverText={"Submit Clip"}
          />
          <HeaderButton
            iconName={"about"}
            iconSize={"25px"}
            hoverText={"About"}
            handleClick={() => {
              setIsModalOpen(true);
              setModalContent("How to Play");
            }}
          />
          <HeaderButton
            iconName={"settings"}
            iconSize={"25px"}
            hoverText={"Settings"}
            handleClick={() => {
              setIsModalOpen(true);
              setModalContent("Settings");
            }}
          />
          <HeaderButton
            iconName={"account"}
            iconSize={"30px"}
            hoverText={"Account"}
            handleClick={() => {
              setIsModalOpen(true);
              setModalContent("Account");
            }}
          />
        </HeaderNavbar>
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
    </div>
  );
};

export default Header;
