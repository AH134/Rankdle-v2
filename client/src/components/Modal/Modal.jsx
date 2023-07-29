import styles from "./Modal.module.css";
import StarList from "../StarList/StarList";
import Button from "../Button/Button";
import { useRef } from "react";

function Modal({ currentClip, selectedRank, gameRankIcons, setShowModal }) {
  const clipRankIcon = gameRankIcons.find(
    (rank) => rank.name === currentClip.rank
  );
  const clipGuessRankIcon = gameRankIcons.find(
    (rank) => rank.name === currentClip.guessedRank
  );
  const modalRef = useRef(0);

  const handleModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <div ref={modalRef} onClick={handleModal} className={styles.bgFilter}>
        <div className={styles.wrapper}>
          <div>
            <StarList score={currentClip.score} starAmount={2} />
          </div>

          <div className={styles.top}>
            <div>
              Your Guess
              <br />
              <img
                src={
                  clipGuessRankIcon !== undefined
                    ? clipGuessRankIcon.src
                    : selectedRank.src
                }
                alt={selectedRank.name}
                width={"80px"}
              />
            </div>

            <div>
              Clip Rank
              <br />
              <img
                src={clipRankIcon.src}
                alt={clipRankIcon.name}
                width={"80px"}
              />
            </div>
          </div>
          <br />
          <div className={styles.bottom}>
            <p>Clip Owner: {currentClip.owner}</p>
          </div>
          <br />
          <div className={styles.button}>
            <Button handleClick={() => setShowModal(false)} context={"Close"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
