import styles from "./Star.module.css";

function Star({ filled }) {
  return (
    <div className={styles.container}>
      <img
        src={`${filled ? "/images/star-filled.svg" : "/images/star-empty.svg"}`}
        alt="star"
        width={"50px"}
      />
    </div>
  );
}

export default Star;
