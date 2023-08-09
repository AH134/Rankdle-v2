import { useEffect, useState } from "react";
import rankIconsList from "../../utils/rankIconsList";
import styles from "./Submit.module.css";
import Button from "../Button/Button";
import Notification from "./Notification/Notification";

function Submit() {
  const [rankIcons, setRankIcons] = useState([]);
  const [game, setGame] = useState("lol");
  const [videoId, setVideoId] = useState("");
  const [clipLink, setClipLink] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [cliprank, setClipRank] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  useEffect(() => {
    setRankIcons(rankIconsList[game]);
    setClipRank(rankIconsList[game][0].name);
  }, [game, rankIcons]);

  const handleClipId = (e) => {
    const id = e.target.value.split("v=")[1].substring(0, 11);
    if (id !== undefined) {
      setVideoId(id);
    }
    setClipLink(e.target.value);
  };

  const handleOwnerName = (e) => {
    setOwnerName(e.target.value);
  };

  const resetFields = () => {
    setClipRank("iron");
    setClipLink("");
    setOwnerName("");
    setVideoId("");
  };

  return (
    <div className={styles.outerContainer}>
      {showNotification && (
        <Notification game={game} isSuccess={isSubmitSuccessful} />
      )}
      <div className={styles.container}>
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            width={"100%"}
            height={"100%"}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={styles.container}
          ></iframe>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.selector}>
            <p>Submit a clip </p>
            <select onChange={(e) => setGame(e.target.value)}>
              <option value="lol">League of legends</option>
              <option value="valorant">Valorant</option>
              <option value="apex">Apex Legends</option>
              {/* <option value="csgo">Counter-Strike: Global Offensive</option> */}
              {/* <option value="chess">Chess</option> */}
            </select>
          </label>
          <label className={styles.selector}>
            <select
              onChange={(e) => setClipRank(e.target.value)}
              value={cliprank}
            >
              {rankIcons.map((rank, index) => {
                return <option key={index}>{rank.name}</option>;
              })}
            </select>
          </label>
          <input
            className={styles.input}
            type="text"
            value={clipLink}
            placeholder="Clip Link"
            onChange={handleClipId}
          />
          <input
            className={styles.input}
            type="text"
            value={ownerName}
            placeholder="Clip Owner"
            onChange={handleOwnerName}
          />
          <Button
            context={"Submit"}
            handleClick={() => {
              if (videoId !== "") {
                setIsSubmitSuccessful(true);
                const clip = {
                  game,
                  name: ownerName,
                  link: `https://www.youtube-nocookie.com/embed/${videoId}`,
                  rank: cliprank,
                };
                resetFields();
                console.log(clip);
              }

              setShowNotification(true);
              setTimeout(() => {
                setShowNotification(false);
                setIsSubmitSuccessful(false);
              }, 5000);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Submit;
