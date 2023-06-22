import styles from "./Home.module.css";
import Card from "./Card/Card";

const Home = () => {
  return (
    <div className={styles.cardContainer}>
      <Card
        src={"../images/card/lol-card.webp"}
        alt={"lol-card"}
        name={"League of Legends"}
        to={"/games/lol"}
      />
      <Card
        src={"../images/card/valorant-card.webp"}
        alt={"valorant-card"}
        name={"Valorant"}
        to={"/games/valorant"}
      />
      <Card
        src={"../images/card/apex-card.webp"}
        alt={"apex-card"}
        name={"Apex Legends"}
        to={"/games/apex"}
      />
      <Card
        src={"../images/card/csgo-card.webp"}
        alt={"csgo-card"}
        name={"Counter-Strike: GO"}
        to={"/games/csgo"}
      />
    </div>
  );
};

export default Home;
