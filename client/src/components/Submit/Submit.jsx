import { useRef, useState } from "react";
import styles from "./Submit.module.css";

function Submit() {
  const optionRef = useRef(0);
  const [videoId, setVideoId] = useState("Video ID");

  return (
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
      <div>
        <label className={styles.selector}>
          <p>Submit a clip </p>
          <select ref={optionRef}>
            <option value="lol">League of legends</option>
            <option value="val">Valorant</option>
            <option value="apex">Apex Legends</option>
            <option value="csgo">Counter-Strike: Global Offensive</option>
            <option value="Chess">Chess</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Submit;
