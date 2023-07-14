import styles from "./ProgressIcon.module.css";

function ProgressIcon({ played, isPlaying, context }) {
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
        backgroundColor: played ? "#80ffff" : "",
        border: isPlaying ? "2px solid grey" : "2px solid white",
      }}
    >
      {context}
    </div>
  );
}

export default ProgressIcon;
