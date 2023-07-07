import { useEffect, useState } from "react";
import styles from "./Game.module.css";
import { useLocation } from "react-router-dom";
import rankIcons from "../utils/rankIcons";

function Games() {
  const location = useLocation();
  const [cuurentGame, setCurrentGame] = useState("");
  const [gameRankedIcons, setGameRankedIcons] = useState([]);
  console.log(gameRankedIcons);

  useEffect(() => {
    const updateGame = () => {
      const gameName = location.pathname.split("/")[2];
      setCurrentGame(gameName);
      setGameRankedIcons(rankIcons[gameName]);
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
        <div style={{ display: "flex" }}>
          {gameRankedIcons ? (
            gameRankedIcons.map((rank, index) => {
              return (
                <div key={index}>
                  <label htmlFor={rank}>
                    <input
                      type="radio"
                      name="rank"
                      value={rank.name}
                      id={rank.name}
                    />
                    <img src={rank.src} alt={rank.name} width={"50px"} />
                  </label>
                </div>
              );
            })
          ) : (
            <>Loading...</>
          )}
        </div>
        <div>button</div>
      </div>
    </>
  );
}

export default Games;
