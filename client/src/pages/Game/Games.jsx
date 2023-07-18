import { useEffect, useState } from "react";
import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
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

const loader = async ({ params }) => {
  const userId = localStorage.getItem("user");
  const user = await userService.getUser(userId);
  const gameData = user.games.find((game) => game.name === params.name);

  let hasClips = false;
  let overallScore = 0;
  if (gameData.clips.length !== 0) {
    hasClips = true;
    overallScore = gameData.clips
      .map((clip) => clip.score)
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
  }

  return [gameData, hasClips, overallScore];
};

function Games() {
  const navigate = useNavigate();
  const [gameData, hasClips, overallScore] = useLoaderData();
  const gameRankIcons = rankIconsList[gameData.name];

  const [selectedRank, setSelectedRank] = useState("");
  const [gameClips, setGameClips] = useState(gameData.clips);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [score, setScore] = useState(overallScore);

  const handleSubmit = async () => {
    const selectedRankObj = gameRankIcons.find(
      (rank) => rank.name === gameClips[currentClipIndex].rank
    );
    const guessDiff = Math.abs(selectedRank.id - selectedRankObj.id);

    let clipScore = 0;
    switch (guessDiff) {
      case 0:
        console.log("you got 2 stars");
        clipScore += 2;
        break;
      case 1:
        console.log("you got 1 star");
        clipScore += 1;
        break;
      default:
        console.log("you got 0 stars");
    }

    const nextClip = gameClips[currentClipIndex + 1] !== undefined;
    if (nextClip) {
      setCurrentClipIndex(currentClipIndex + 1);
    }

    clipService
      .update(gameClips[currentClipIndex].id, {
        score: clipScore,
        played: true,
      })
      .then(() => {
        gameData.clips[currentClipIndex].score = clipScore;
        gameData.clips[currentClipIndex].played = true;
        console.log(gameData.clips[currentClipIndex]);
        localStorage.setItem("user", JSON.stringify(gameData));
      });

    setScore(score + clipScore);
    setSelectedRank("");
    const updatedClip = { ...gameClips[currentClipIndex], played: true };
    setGameClips(
      gameClips.map((clip) =>
        clip.id !== gameClips[currentClipIndex].id ? clip : updatedClip
      )
    );
  };

  return (
    <>
      {hasClips ? (
        <>
          <button
            onClick={() => {
              const user = localStorage.getItem("user");
              userService.deleteUser(user).then(() => {
                localStorage.removeItem("user");
                navigate("/");
              });
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
export { loader };
