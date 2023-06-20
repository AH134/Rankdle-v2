import styles from "./Home.module.css";
import { Timer } from "../../components";
import Card from "./Card/Card";

const Home = () => {
  return (
    <div className={styles.container}>
      <Timer />
      <div className={styles.cardContainer}>
        <Card
          src={"../images/__test__/lol-card.webp"}
          alt={"lol-card"}
          name={"League of Legends"}
          to={"/games/lol"}
        />
        <Card
          src={"../images/__test__/valorant-card.webp"}
          alt={"valorant-card"}
          name={"Valorant"}
          to={"/games/valorant"}
        />
      </div>
    </div>
  );
};

export default Home;
