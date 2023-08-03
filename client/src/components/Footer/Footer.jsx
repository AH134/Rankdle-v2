import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <hr className={styles.breaker} />
      <div className={styles.content}>
        <p>
          Inspired by
          <a href="rankdle.com"> Rankdle.com</a>
        </p>
        <nav>yo</nav>
      </div>
    </div>
  );
}

export default Footer;
