import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../components";
import useModal from "../hooks/useModal";

const StatPanel = ({ score }) => {
  return <div>you got {score}</div>;
};

const Game = () => {
  const gameData = useLoaderData();
  const [isModalOpen, modalContent, setModalOpen, setModalClose] = useModal();
  const clips = [...gameData.clips];
  const [roundScore, setRoundScore] = useState(0);
  const [score, setScore] = useState(0);
  const [currentClip, setCurrentClip] = useState(clips[0]);
  const [selectedRank, setSelectedRank] = useState("");

  console.log(currentClip);
  const handleSubmit = () => {
    if (selectedRank !== "") {
      const clipRankIndex = gameData.rankList.indexOf(currentClip.clipRank);
      const guessRankIndex = gameData.rankList.indexOf(selectedRank);
      const guessDiff = Math.abs(clipRankIndex - guessRankIndex);

      if (guessDiff === 0) {
        setScore(score + 2);
        setRoundScore(2);
      } else if (guessDiff === 1) {
        setScore(score + 1);
        setRoundScore(1);
      } else {
        setRoundScore(0);
      }

      if (currentClip.clipNumber < 3) {
        setCurrentClip(clips[currentClip.clipNumber]);
        setModalOpen("Round Stats");
      } else {
        setModalOpen("Overall Stats");
      }
    } else {
      alert("Choose a rank");
    }

    setSelectedRank("");
  };

  return (
    <div>
      <div>stars section</div>
      <div>
        <iframe
          width="560"
          height="315"
          src={currentClip.clipLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div>progress bar section</div>
      <div>
        {gameData.rankList.map((rank, index) => {
          return (
            <div key={index}>
              <input
                onChange={(e) => setSelectedRank(e.target.value)}
                type="radio"
                name="rank"
                value={rank}
                id={rank}
                checked={selectedRank === rank}
              />
              <label htmlFor={rank}>{rank}</label>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={handleSubmit}>submit</button>
      </div>
      <Modal isOpen={isModalOpen} handleModalClose={setModalClose}>
        <StatPanel score={roundScore} />
      </Modal>
    </div>
  );
};

export default Game;
