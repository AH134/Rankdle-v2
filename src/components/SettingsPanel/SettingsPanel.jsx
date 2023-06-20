import styles from "./SettingsPanel.module.css";

const SettingsPanel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Settings</h2>
      </div>
      <div className={styles.main}></div>
    </div>
  );
};

export default SettingsPanel;
