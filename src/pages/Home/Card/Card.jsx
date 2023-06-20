import styles from "./Card.module.css";

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src="../images/__test__/lol-card.webp" alt="card-lol" />
      </div>
      <div className={styles.name}>game name</div>
      <div className={styles.buttonContainer}>
        <button>play</button>
        <span>played indicator</span>
      </div>
    </div>
  );
};

export default Card;
