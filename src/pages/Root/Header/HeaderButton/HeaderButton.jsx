import { Link } from "react-router-dom";
import styles from "./HeaderButton.module.css";

const NavbarItem = ({
  type,
  iconName,
  iconSize,
  hoverText = "",
  handleClick,
}) => {
  return (
    <li>
      {type === "link" ? (
        <Link to={iconName} className={styles.navbarItem}>
          <img
            src={`../images/header/${iconName}-icon.svg`}
            alt={iconName}
            width={iconSize}
          />
        </Link>
      ) : (
        <button className={styles.navbarItem} onClick={handleClick}>
          <img
            src={`../images/header/${iconName}-icon.svg`}
            alt={iconName}
            width={iconSize}
          />
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

export default NavbarItem;
