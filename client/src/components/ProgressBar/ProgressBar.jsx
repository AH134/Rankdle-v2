import ProgressIcon from "./ProgressIcon/ProgressIcon";
import styles from "./ProgressBar.module.css";

function ProgressBar({ clips, currentClipIndex }) {
  const hrStyle = {
    width: "41.6%",
    height: "0.2rem",
    backgroundColor: "grey",
    border: "none",
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ProgressIcon
          context={"1"}
          isPlaying={currentClipIndex === 0}
          played={clips[0].played}
        />
        <hr style={hrStyle} />
        <ProgressIcon
          context={"2"}
          isPlaying={currentClipIndex === 1}
          played={clips[1].played}
        />
        <hr style={hrStyle} />
        <ProgressIcon
          context={"3"}
          isPlaying={currentClipIndex === 2}
          played={clips[2].played}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
