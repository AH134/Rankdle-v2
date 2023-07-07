import { Link } from "react-router-dom";
import GameLink from "./GameLink";
import styles from "./Header.module.css";

function Header() {
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
      <hr className={styles.breaker} />
      <div className={styles.bottomSection}>
        <nav>
          <ul>
            <GameLink
              to={"/games/lol"}
              gameName={"lol"}
              context={"League Of Legends"}
            />
            <GameLink
              to={"/games/val"}
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
