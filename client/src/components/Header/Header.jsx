import { Link } from "react-router-dom";
import GameLink from "./GameLink/GameLink";
import styles from "./Header.module.css";

function Header({ isRootPage }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topSection}>
        <h1>
          <Link to={"/"}>Rankdle</Link>
        </h1>
        <nav>
          <ul>
            <li>About</li>
            <li>Settings</li>
          </ul>
        </nav>
      </div>
      <hr />
      <div style={{ display: `${isRootPage ? "none" : ""}` }}>
        <nav className={styles.bottomSection}>
          <ul>
            <GameLink
              to={"/games/lol"}
              gameName={"lol"}
              context={"League Of Legends"}
            />
            <GameLink
              to={"/games/valorant"}
              gameName={"valorant"}
              context={"Valorant"}
            />
            <GameLink
              to={"/games/apex"}
              gameName={"apex"}
              context={"Apex Legends"}
            />
            <GameLink
              to={"/games/csgo"}
              gameName={"csgo"}
              context={"Counter Strike: GO"}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
