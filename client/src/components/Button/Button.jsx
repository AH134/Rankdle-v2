import styles from "./Button.module.css";

function Button({ context, handleClick }) {
  return (
    <button className={styles.button} onClick={handleClick}>
      {context}
    </button>
  );
}

export default Button;
