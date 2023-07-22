import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
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
  Modal,
} from "../../components";

const loader = ({ params }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const gameData = user.games.find((game) => game.name === params.name);

  if (gameData === undefined || gameData.clips.length === 0) {
    throw new Response("Game is currently in progress", {
      status: 404,
      statusText: "WIP",
    });
  }

  const overallScore = gameData.clips
    .map((clip) => clip.score)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  return [gameData, overallScore];
};

function Games() {
  const navigate = useNavigate();
  const [gameData, overallScore] = useLoaderData();
  const [selectedRank, setSelectedRank] = useState("");
  const [gameClips, setGameClips] = useState(gameData.clips);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [score, setScore] = useState(overallScore);
  const gameRankIcons = rankIconsList[gameData.name];

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

    clipService.update(gameClips[currentClipIndex].id, {
      score: clipScore,
      played: true,
    });

    setScore(score + clipScore);
    setSelectedRank("");
    const updatedClip = {
      ...gameClips[currentClipIndex],
      score: clipScore,
      played: true,
    };

    setGameClips(
      gameClips.map((clip) =>
        clip.id !== gameClips[currentClipIndex].id ? clip : updatedClip
      )
    );
  };

  const handlePrevious = () => {
    if (gameClips[currentClipIndex - 1]) {
      setCurrentClipIndex(currentClipIndex - 1);
    }
    setSelectedRank("");
  };

  const handleNext = () => {
    if (gameClips[currentClipIndex + 1] && gameClips[currentClipIndex].played) {
      setCurrentClipIndex(currentClipIndex + 1);
    }
    setSelectedRank("");
  };

  const handleResult = () => {
    console.log("result");
    console.log(gameClips[currentClipIndex].played);
  };
  return (
    <>
      <button
        onClick={() => {
          const user = JSON.parse(localStorage.getItem("user")).id;
          userService.deleteUser(user).then(() => {
            console.log("deleted user", user);
            localStorage.removeItem("user");
            navigate("/");
          });
        }}
      >
        delete account
      </button>
      <StarList score={score} starAmount={6} />

      <div className={styles.videoContainer}>
        <IFrame clips={gameClips} currentClipIndex={currentClipIndex} />
      </div>

      <ProgressBar clips={gameClips} currentClipIndex={currentClipIndex} />

      <div>
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

        <div className={styles.buttonContainer}>
          <Button context={"Previous"} handleClick={handlePrevious} />
          <Button context={"Result"} handleClick={handleResult} />
          {selectedRank !== "" && !gameClips[currentClipIndex].played ? (
            <Button context={"Submit"} handleClick={handleSubmit} />
          ) : null}
          <Button context={"Next"} handleClick={handleNext} />
        </div>
        <Modal></Modal>
      </div>
    </>
  );
}

export default Games;
export { loader };
