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
      <div className={styles.buttonContainer}>
        <Link to={to}>play</Link>
        <span>played indicator</span>
      </div>
    </div>
  );
};

export default Card;
