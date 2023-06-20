import { Link } from "react-router-dom";
import styles from "./HeaderButton.module.css";

const Button = ({ type, to, src, alt, width, hoverText = "", handleClick }) => {
  return (
    <li onClick={handleClick}>
      {type === "link" ? (
        <Link to={to} className={styles.navbarItem}>
          <img src={src} alt={alt} width={width} />
        </Link>
      ) : (
        <button className={styles.navbarItem}>
          <img src={src} alt={alt} width={width} />
        </button>
      )}
      {hoverText !== "" ? (
        <div className={styles.hoverText}>
          <h1>{hoverText}</h1>
        </div>
      ) : null}
    </li>
  );
};

export default Button;
