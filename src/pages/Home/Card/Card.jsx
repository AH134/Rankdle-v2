import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ src, alt, name, to }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Link to={to}>
          <img src={src} alt={alt} />
        </Link>
      </div>
      <div className={styles.nameContainer}>
        <p>{name}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <span>Stats</span>
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <Link to={to} className={styles.button}>
            Play
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
