import { useRouteError } from "react-router-dom";
import styles from "./Error.module.css";

function Error() {
  const error = useRouteError();
  return (
    <div className={styles.container}>
      <a
        href="https://www.pixiv.net/en/users/16274829"
        className={styles.errorImage}
      >
        <img src="/images/error/1.gif" alt="error-gif" />
      </a>

      <div className={styles.error}>
        <h1>{error.status}</h1>
        <p>{error.data}</p>
      </div>
    </div>
  );
}

export default Error;
