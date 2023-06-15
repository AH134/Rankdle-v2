import { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import styles from "./Header.module.css";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div id={styles["wrapper"]}>
      <div
        id={styles["sidebar-wrapper"]}
        className={styles["button-background"]}
      >
        <Hamburger
          duration={0.2}
          toggled={showSidebar}
          toggle={setShowSidebar}
        />
      </div>
      <aside
        id={styles["sidebar"]}
        className={styles[`${showSidebar ? "active" : ""}`]}
      >
        <div>THIS</div>
        <div>IS</div>
        <div>LEFTSIDE</div>
      </aside>

      <Link id={styles["title"]} to="/">
        <h1>Rankdle V2</h1>
      </Link>

      <nav>
        <ul id={styles["navbar-list"]}>
          <li className={styles["navbar-items"]}>
            <Link to="/submit" className={styles["button-background"]}>
              <img src="/submit-icon.svg" alt="submit" width="35px"></img>
            </Link>
            <div className={styles["button-subtitle"]}>
              <p>Submit Clip</p>
            </div>
          </li>

          <li className={styles["navbar-items"]}>
            <button className={styles["button-background"]}>
              <img
                src="/question-mark-icon.svg"
                alt="submit"
                width="35px"
              ></img>
            </button>
            <div className={styles["button-subtitle"]}>
              <p>About</p>
            </div>
          </li>

          <li className={styles["navbar-items"]}>
            <Link to="account" className={styles["button-background"]}>
              <img src="/account-icon.svg" alt="submit" width="40px"></img>
            </Link>
            <div className={styles["button-subtitle"]}>
              <p>Account</p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
