import styles from "./SidebarUser.module.css";
const SidebarUser = () => {
  return (
    <div className={styles.userContainer}>
      <div className={styles.userIcon}>
        <img src="/images/user/default.webp" alt="default-icon" />
      </div>
      <div className={styles.userContent}>
        <div className={styles.username}>Guest User</div>
        <div className={styles.userStreak}>Daily Streak: 0</div>
      </div>
    </div>
  );
};

export default SidebarUser;
