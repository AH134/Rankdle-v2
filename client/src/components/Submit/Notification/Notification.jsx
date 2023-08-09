import styles from "./Notification.module.css";

function Notification({ game, isSuccess }) {
  return (
    <>
      {isSuccess ? (
        <div className={styles.success}>
          <h2>Success</h2>
          <p>Thank you for submitting a clip for {game}!</p>
        </div>
      ) : (
        <div className={styles.error}>
          <h2>Error</h2>
          <p>Something went wrong! (Perhaps an invalid clip)</p>
        </div>
      )}
    </>
  );
}

export default Notification;
