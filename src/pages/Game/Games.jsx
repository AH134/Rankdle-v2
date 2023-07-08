import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import rankIconsList from "../../utils/rankIconsList";
import RankIcon from "../../components/RankIcon";
import styles from "./Game.module.css";

function Games() {
  const location = useLocation();
  const [gameRankedIcons, setGameRankedIcons] = useState([]);
  const [selectedRank, setSelectedRank] = useState("");

  useEffect(() => {
    const updateGame = () => {
      const gameName = location.pathname.split("/")[2];
      setGameRankedIcons(rankIconsList[gameName]);
      setSelectedRank("");
    };

    updateGame();
  }, [location]);

  return (
    <>
      <div>stars</div>
      <div className={styles.videoContainer}>
        {" "}
        <iframe
          src="https://www.youtube-nocookie.com/embed/9B0yX0UIN9M"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div>
      <div>
        <div>level</div>
        <div className={styles.rankIconContainer}>
          {gameRankedIcons &&
            gameRankedIcons.map((rank, index) => (
              <RankIcon
                key={index}
                rank={rank}
                selectedRank={selectedRank}
                handleSelectRank={(e) => {
                  setSelectedRank(e.target.value);
                }}
              />
            ))}
        </div>
        <p>
          Selected Rank:{" "}
          {selectedRank
            ? selectedRank.charAt(0).toUpperCase() + selectedRank.substring(1)
            : "None"}
        </p>
        <div>
          <button>Previous Clip</button>
          <button>Submit</button>
        </div>
      </div>
    </>
  );
}

export default Games;
