import { useState } from "react";
import styles from "./Header.module.css";
import Navbar from "./Navbar/Navbar";
import NavberItem from "./NavbarItem/NavbarItem";
import Modal from "../Modal/Modal";
import Hamburger from "hamburger-react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.hamburgerMenu}>
          <Hamburger size={25} />
        </div>

        <div>
          <h1 className={styles.title}>Rankdle V2</h1>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            console.log(isModalOpen);
          }}
        >
          yo
        </button>
        <Navbar>
          <NavberItem
            type="link"
            iconName={"submit"}
            iconSize={"30px"}
            hoverText={"Submit Clip"}
          />
          <NavberItem
            iconName={"about"}
            iconSize={"25px"}
            hoverText={"About"}
          />
          <NavberItem
            iconName={"settings"}
            iconSize={"25px"}
            hoverText={"Settings"}
          />
          <NavberItem
            iconName={"account"}
            iconSize={"25px"}
            hoverText={"Account"}
          />
        </Navbar>
      </div>

      <Modal
        context={"About"}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Header;
