import { useEffect, useState } from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import styles from "./Game.module.css";
import rankIconsList from "../../utils/rankIconsList";
import userService from "../../services/user";
import clipService from "../../services/clips";

import {
  RankIcon,
  Button,
  IFrame,
  StarList,
  ProgressBar,
} from "../../components";

const TempnoGame = () => {
  return (
    <div>
      <h1>Work In Progress!</h1>
    </div>
  );
};

function Games() {
  const user = useOutletContext();
  const gameLocation = useLocation();
  const navigate = useNavigate();
  const gameName = gameLocation.pathname.slice(
    gameLocation.pathname.lastIndexOf("/") + 1
  );
  const gameRankIcons = rankIconsList[gameName];

  const [selectedRank, setSelectedRank] = useState("");
  const [gameClips, setGameClips] = useState([]);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [hasClips, setHasClips] = useState();
  const [score, setScore] = useState(0);

  useEffect(() => {
    user.games.find((game) => {
      if (game.name === gameName) {
        setGameClips(game.clips);
        setHasClips(game.clips.length !== 0 ? true : false);
        setScore(
          game.clips[0].score + game.clips[1].score + game.clips[2].score
        );
        const initialClipIndex = game.clips.findIndex((clip) => !clip.played);
        setCurrentClipIndex(initialClipIndex === -1 ? 2 : initialClipIndex);
        console.log(initialClipIndex === -1);
      }
    });
    setSelectedRank("");
  }, [gameName, user.games, hasClips, score]);

  const handleSubmit = async () => {
    const selectedRankObj = gameRankIcons.find(
      (rank) => rank.name === gameClips[currentClipIndex].rank
    );
    const guessDiff = Math.abs(selectedRank.id - selectedRankObj.id);

    let newScore = score;
    switch (guessDiff) {
      case 0:
        console.log("you got 2 stars");
        newScore += 2;
        break;
      case 1:
        console.log("you got 1 star");
        newScore += 1;
        break;
      default:
        console.log("you got 0 stars");
    }

    const nextClip = gameClips[currentClipIndex + 1] !== undefined;
    if (nextClip) {
      setCurrentClipIndex(currentClipIndex + 1);
    }

    await clipService
      .update(gameClips[currentClipIndex].id, {
        score: newScore,
        played: true,
      })
      .then((res) => console.log(res));

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
      {hasClips ? (
        <>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              userService
                .deleteUser(user.id)
                .then(() => window.location.reload());
            }}
          >
            delete account
          </button>
          <StarList score={score} />

          <div className={styles.videoContainer}>
            <IFrame clips={gameClips} currentClipIndex={currentClipIndex} />
          </div>
          <ProgressBar clips={gameClips} currentClip={currentClipIndex} />

          <div>
            {/* work on level */}
            <div style={{ display: "flex", alignItems: "center" }}></div>
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
                    if (gameClips[currentClipIndex - 1]) {
                      setCurrentClipIndex(currentClipIndex - 1);
                      navigate(-1);
                    }
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
                    if (gameClips[currentClipIndex + 1]) {
                      setCurrentClipIndex(currentClipIndex + 1);
                      navigate(1);
                    }
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
      ) : (
        <TempnoGame />
      )}
    </>
  );
}

export default Games;
