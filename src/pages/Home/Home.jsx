import styles from "./Home.module.css";
import { Timer } from "../../components";
import Card from "./Card/Card";

const Home = () => {
  return (
    <div className={styles.container}>
      <Timer />
      <div className={styles.cardContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Home;
