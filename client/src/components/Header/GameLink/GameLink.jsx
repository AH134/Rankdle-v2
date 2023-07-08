import { Link } from "react-router-dom";
import styles from "./GameLink.module.css";

function GameLink({ to, gameName, context }) {
  return (
    <li className={styles.container}>
      <Link to={to}>
        <img
          src={`/images/games/${gameName}/${gameName}-logo.webp`}
          alt={gameName}
          width={"35px"}
        />
        <span>{context}</span>
      </Link>
    </li>
  );
}

export default GameLink;
