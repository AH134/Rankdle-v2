import { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import rankIconsList from "../../utils/rankIconsList";
import RankIcon from "../../components/RankIcon";
import styles from "./Game.module.css";

function Games() {
  const user = useOutletContext();
  const gameLocation = useLocation();
  const gameName = gameLocation.pathname.slice(
    gameLocation.pathname.lastIndexOf("/") + 1
  );
  const rankIcons = rankIconsList[gameName];
  const [selectedRank, setSelectedRank] = useState("");
  const [gameClips, setGameClips] = useState([]);

  useEffect(() => {
    user.games.find((game) => {
      if (game.name === gameName) {
        setGameClips(game.clips);
        return;
      }
    });
    setSelectedRank("");
  }, [gameName, user.games]);

  return (
    <>
      <div>stars</div>
      <div className={styles.videoContainer}>
        {" "}
        <iframe
          src={gameClips.length ? gameClips[0].link : ""}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div>
      <div>
        <div>level</div>
        <div className={styles.rankIconContainer}>
          {rankIcons &&
            rankIcons.map((rank, index) => (
              <RankIcon
                key={index}
                rank={rank}
                selectedRank={selectedRank.name || ""}
                setSelectedRank={setSelectedRank}
              />
            ))}
        </div>
        <p>
          {/* Selected Rank:{" "}
          {selectedRank.name
            ? selectedRank.name.charAt(0).toUpperCase() +
              selectedRank.name.substring(1)
            : "None"} */}
          {user.currStreak}
        </p>
        <div>
          {/* temp button onlick func */}
          <button>Previous Clip</button>
          <button>Submit</button>
          <button>Next Clip</button>
        </div>
      </div>
    </>
  );
}

export default Games;
