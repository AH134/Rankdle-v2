import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import styles from "./Header.module.css";

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

const NavbarItem = (props) => {
  const { type, route, img, imgSize, hoverText, showModal, toggleOpen } = props;
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
            <button
              className={styles["button-background"]}
              onClick={() => {
                showModal(true);
                toggleOpen(true);
              }}
            >
              {" "}
              <img
                src={`images/header/${img}-icon.svg`}
                alt={img}
                width={`${imgSize}px`}
              ></img>
            </button>
          )}
        </div>

        <div className={styles["button-subtitle"]}>
          <p>{hoverText}</p>
        </div>
      </li>
    </>
  );
};

const Navbar = (props) => {
  const { setShowAccount, setShowAbout, setShowStats, setIsOpen } = props;

  return (
    <nav>
      <ul id={styles["navbar-list"]}>
        <NavbarItem
          type={"link"}
          route={"submit"}
          img={"submit"}
          imgSize={"25"}
          hoverText={"Submit Clip"}
        />
        <NavbarItem
          img={"question-mark"}
          imgSize={"25"}
          hoverText={"About"}
          showModal={setShowAbout}
          toggleOpen={setIsOpen}
        />
        <NavbarItem
          img={"stats"}
          imgSize={"25"}
          hoverText={"Stats"}
          showModal={setShowStats}
          toggleOpen={setIsOpen}
        />
        <NavbarItem
          img={"account"}
          imgSize={"30"}
          hoverText={"Account"}
          showModal={setShowAccount}
          toggleOpen={setIsOpen}
        />
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

const Modal = (props) => {
  const { children, isOpen, setIsOpen, setShowContent } = props;
  const modalRef = useRef(0);
  return (
    <div
      ref={modalRef}
      className={`${styles["mask-modal"]} ${
        isOpen ? styles["modal-active"] : ""
      }`}
      onClick={(e) => {
        if (e.target === modalRef.current) {
          setIsOpen(false);
          setShowContent(false);
        }
      }}
    >
      <div
        className={`${styles["modal-wrapper"]} ${
          isOpen ? styles["modal-animation"] : ""
        }`}
      >
        <div className={styles["modal-container"]}>{children}</div>
      </div>
    </div>
  );
};

const Header = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const setShowContent = showAbout
    ? setShowAbout
    : showStats
    ? setShowStats
    : showAccount
    ? setShowAccount
    : null;

  return (
    <div id={styles["wrapper"]}>
      <Sidebar />

      <Link id={styles["title"]} to="/">
        <h1>Rankdle V2</h1>
      </Link>

      <Navbar
        setShowAbout={setShowAbout}
        setShowAccount={setShowAccount}
        setShowStats={setShowStats}
        setIsOpen={setIsOpen}
      />

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setShowContent={setShowContent}
      >
        {showAbout ? <About /> : null}
        {showStats ? <Stats /> : null}
        {showAccount ? <Account /> : null}
      </Modal>
    </div>
  );
};

export default Header;
