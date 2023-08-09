import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
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

  if (gameData === undefined || gameData.clips.length < 3) {
    throw new Response(`Uh Oh! ${params.name.toUpperCase()} has no clips!`, {
      status: 404,
      statusText: "Game No Clip",
    });
  }

  const overallScore = gameData.clips
    .map((clip) => clip.score)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  const gameRankIcons = rankIconsList[gameData.name];

  return [gameData, overallScore, gameRankIcons];
};

function Games() {
  const [gameData, overallScore, gameRankIcons] = useLoaderData();
  const [selectedRank, setSelectedRank] = useState("");
  const [gameClips, setGameClips] = useState(gameData.clips);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [score, setScore] = useState(overallScore);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setGameClips(gameData.clips);
    setScore(overallScore);
  }, [gameData, overallScore]);

  const handleSubmit = async () => {
    const selectedRankObj = gameRankIcons.find(
      (rank) => rank.name === gameClips[currentClipIndex].rank
    );
    const guessDiff = Math.abs(selectedRank.id - selectedRankObj.id);
    let clipScore = 0;

    switch (guessDiff) {
      case 0:
        clipScore = 2;
        break;
      case 1:
        clipScore = 1;
        break;
    }

    const updatedClip = {
      ...gameClips[currentClipIndex],
      score: clipScore,
      played: true,
      guessedRank: selectedRank.name,
    };

    await clipService.update(gameClips[currentClipIndex].id, {
      score: clipScore,
      played: true,
      guessedRank: selectedRank.name,
    });

    setGameClips(
      gameClips.map((clip) =>
        clip.id !== gameClips[currentClipIndex].id ? clip : updatedClip
      )
    );
    setScore(score + clipScore);
    setSelectedRank("");
    setShowModal(true);

    userService
      .getUser(JSON.parse(localStorage.getItem("user")).id)
      .then((updatedUser) =>
        localStorage.setItem("user", JSON.stringify(updatedUser))
      );
  };

  const handlePrevious = () => {
    if (gameClips[currentClipIndex - 1]) {
      setCurrentClipIndex(currentClipIndex - 1);
      setSelectedRank("");
    }
  };

  const handleNext = () => {
    if (gameClips[currentClipIndex + 1] && gameClips[currentClipIndex].played) {
      setCurrentClipIndex(currentClipIndex + 1);
      setSelectedRank("");
    }
  };

  const handleResult = () => {
    if (gameClips[currentClipIndex].played) {
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal ? (
        <Modal
          currentClip={gameClips[currentClipIndex]}
          selectedRank={selectedRank}
          gameRankIcons={gameRankIcons}
          setShowModal={setShowModal}
        ></Modal>
      ) : null}
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

          {gameClips[currentClipIndex].played && (
            <Button context={"Result"} handleClick={handleResult} />
          )}

          {selectedRank !== "" && !gameClips[currentClipIndex].played ? (
            <Button context={"Submit"} handleClick={handleSubmit} />
          ) : null}

          <Button context={"Next"} handleClick={handleNext} />
        </div>
      </div>
    </>
  );
}

export default Games;
export { loader };
