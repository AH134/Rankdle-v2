import styles from "./IFrame.module.css";

function IFrame({ clips, currentClipIndex }) {
  return (
    <iframe
      src={clips[currentClipIndex] && clips[currentClipIndex].link}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={styles.container}
    ></iframe>
  );
}

export default IFrame;
