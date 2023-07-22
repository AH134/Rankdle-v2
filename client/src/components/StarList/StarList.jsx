import Star from "./Star/Star";
import styles from "./StarList.module.css";

function StarList({ score, starAmount }) {
  const stars = () => {
    const stars = [];
    for (let i = 0; i < starAmount; i++) {
      if (i < score) {
        stars.push(<Star key={i} filled={true} />);
      } else {
        stars.push(<Star key={i} filled={false} />);
      }
    }
    return stars;
  };
  return <div className={styles.container}>{stars()}</div>;
}

export default StarList;
