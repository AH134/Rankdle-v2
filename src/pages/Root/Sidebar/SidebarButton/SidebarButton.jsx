import styles from "./SidebarButton.module.css";
import { Link } from "react-router-dom";

const SidebarButton = ({
  type = "game",
  to,
  src,
  alt,
  width,
  label,
  handleClick,
}) => {
  return (
    <div className={styles.container}>
      {type === "game" ? (
        <Link className={styles.linkButton} to={to} onClick={handleClick}>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={src} alt={alt} width={width} />
          </div>
          <span>{label}</span>
        </Link>
      ) : (
        <a href={to} className={styles.linkButton}>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={src} alt={alt} width={width} />
          </div>
        </a>
      )}
    </div>
  );
};

export default SidebarButton;
