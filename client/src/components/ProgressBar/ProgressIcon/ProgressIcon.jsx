import styles from "./ProgressIcon.module.css";

function ProgressIcon({ played, isPlaying, context }) {
  const completedColor = "#009900";
  const style = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: "3.5rem",
    height: "3.5rem",
  };

  return (
    <div
      style={{
        ...style,
        backgroundColor: played ? completedColor : "",
        border: isPlaying ? `2px solid white` : "2px solid white",
      }}
    >
      <span style={{ fontSize: "1.5rem" }}>{context}</span>
    </div>
  );
}

export default ProgressIcon;
