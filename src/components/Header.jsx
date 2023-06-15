import { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import styles from "./Header.module.css";
import useClickOutside from "../hooks/useClickOutside";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div id={styles["hamburger-menu"]}>
        <div className={styles["button-background"]}>
          <Hamburger
            size={25}
            duration={0.2}
            toggled={showSidebar}
            toggle={setShowSidebar}
          />
        </div>
      </div>
      <aside
        id={styles["sidebar"]}
        className={styles[`${showSidebar ? "active" : ""}`]}
      >
        <nav>
          <ul>
            <li>Game 1</li>
            <li>Game 2</li>
            <li>Game 3</li>
            <li>Game 4</li>
            <li>Game 5</li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

const NavbarItem = ({
  children = null,
  type = null,
  route = null,
  img,
  imgSize,
  hoverText,
}) => {
  return (
    <>
      <li className={styles["navbar-items"]}>
        <div className={styles["button-background"]}>
          {type === "link" ? (
            <Link to={`/${route}`} className={styles["button-background"]}>
              <img
                src={`images/header/${img}-icon.svg`}
                alt={img}
                width={`${imgSize}px`}
              ></img>
            </Link>
          ) : (
            <Modal img={img} imgSize={imgSize}>
              {children}
            </Modal>
          )}
        </div>

        <div className={styles["button-subtitle"]}>
          <p>{hoverText}</p>
        </div>
      </li>
    </>
  );
};

const Navbar = () => {
  return (
    <nav>
      <ul id={styles["navbar-list"]}>
        <NavbarItem
          type={"link"}
          route={"submit"}
          img={"submit"}
          imgSize={"25"}
          hoverText={"Submit Clip"}
        ></NavbarItem>

        <NavbarItem img={"question-mark"} imgSize={"25"} hoverText={"About"}>
          <About />
        </NavbarItem>

        <NavbarItem img={"stats"} imgSize={"25"} hoverText={"Stats"}>
          <Stats />
        </NavbarItem>

        <NavbarItem img={"account"} imgSize={"30"} hoverText={"Account"}>
          <Account />
        </NavbarItem>
      </ul>
    </nav>
  );
};

const About = () => {
  return <div>This is the about modal</div>;
};

const Stats = () => {
  return <div>This is the Stats modal</div>;
};

const Account = () => {
  return <div>This is the Account modal</div>;
};

const Modal = ({ children, img, imgSize }) => {
  const [ref, openDialog, closeDialog] = useClickOutside();

  return (
    <>
      <button className={styles["button-background"]} onClick={openDialog}>
        {" "}
        <img
          src={`images/header/${img}-icon.svg`}
          alt={img}
          width={`${imgSize}px`}
        ></img>
      </button>
      <dialog className={styles["modal"]} ref={ref}>
        {children}
        <button onClick={closeDialog}>Close</button>
      </dialog>
    </>
  );
};

const Header = () => {
  return (
    <div id={styles["wrapper"]}>
      <Sidebar />

      <Link id={styles["title"]} to="/">
        <h1>Rankdle V2</h1>
      </Link>

      <Navbar />
    </div>
  );
};

export default Header;
