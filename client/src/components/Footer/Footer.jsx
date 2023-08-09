import styles from "./Footer.module.css";
import FooterIcon from "./FooterIcon/FooterIcon";

function Footer() {
  return (
    <div className={styles.container}>
      <hr className={styles.breaker} />
      <div className={styles.content}>
        <p>
          Inspired by
          <a href="https://rankdle.com"> Rankdle.com</a>
        </p>
        <nav className={styles.rightContent}>
          <ul>
            <li>
              <FooterIcon
                src={"/images/github.svg"}
                link={"https://github.com/AH134/Rankdle-v2"}
                context={"github"}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
