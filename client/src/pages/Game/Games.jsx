import { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import rankIconsList from "../../utils/rankIconsList";
import RankIcon from "../../components/RankIcon";
import Button from "../../components/Button";
import styles from "./Game.module.css";
import StarList from "../../components/StarList/StarList";

function Games() {
  const user = useOutletContext();
  const gameLocation = useLocation();
  const gameName = gameLocation.pathname.slice(
    gameLocation.pathname.lastIndexOf("/") + 1
  );
  const gameRankIcons = rankIconsList[gameName];

  const [selectedRank, setSelectedRank] = useState("");
  const [gameClips, setGameClips] = useState([]);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    user.games.find((game) => {
      if (game.name === gameName) {
        setGameClips(game.clips);
        return;
      }
    });
    setSelectedRank("");
  }, [gameName, user.games]);

  const handleSubmit = async () => {
    const selectedRankObj = gameRankIcons.find(
      (rank) => rank.name === gameClips[currentClipIndex].rank
    );
    const guessDiff = Math.abs(selectedRank.id - selectedRankObj.id);

    switch (guessDiff) {
      case 0:
        console.log("you got 2 stars");
        setScore(score + 2);
        break;
      case 1:
        console.log("you got 1 star");
        setScore(score + 1);
        break;
      default:
        console.log("you got 0 stars");
    }

    const nextClip = gameClips[currentClipIndex + 1] !== undefined;
    if (nextClip) {
      setCurrentClipIndex(currentClipIndex + 1);
    }

    setSelectedRank("");

    const updatedClip = { ...gameClips[currentClipIndex], played: true };
    setGameClips(
      gameClips.map((clip) =>
        clip.id !== gameClips[currentClipIndex].id ? clip : updatedClip
      )
    );
    console.log(gameClips);
  };

  return (
    <>
      <StarList score={score} />
      <div className={styles.videoContainer}>
        {" "}
        <iframe
          src={gameClips[currentClipIndex] && gameClips[currentClipIndex].link}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div>
      <div>
        <div>level</div>
        <div className={styles.rankIconContainer}>
          {gameRankIcons &&
            gameRankIcons.map((rank, index) => (
              <RankIcon
                key={index}
                rank={rank}
                selectedRank={selectedRank.name || ""}
                setSelectedRank={setSelectedRank}
              />
            ))}
        </div>
        <p>
          Selected Rank:{" "}
          {selectedRank.name
            ? selectedRank.name.charAt(0).toUpperCase() +
              selectedRank.name.substring(1)
            : "None"}
        </p>
        <div className={styles.buttonContainer}>
          {gameClips[currentClipIndex - 1] && (
            <Button
              context={"Previous"}
              handleClick={() => {
                gameClips[currentClipIndex - 1] &&
                  setCurrentClipIndex(currentClipIndex - 1);
                setSelectedRank("");
              }}
            />
          )}
          <Button
            context={"result"}
            handleClick={() => {
              console.log("result");
              console.log(gameClips[currentClipIndex].played);
            }}
          />

          {gameClips[currentClipIndex + 1] &&
          gameClips[currentClipIndex].played ? (
            <Button
              context={"Next"}
              handleClick={() => {
                gameClips[currentClipIndex + 1] &&
                  setCurrentClipIndex(currentClipIndex + 1);
                setSelectedRank("");
              }}
            />
          ) : null}
          {selectedRank !== "" && !gameClips[currentClipIndex].played ? (
            <Button context={"Submit"} handleClick={handleSubmit} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Games;
