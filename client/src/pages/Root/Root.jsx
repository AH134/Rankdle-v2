import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";

function Root() {
  return (
    <div className={styles.wrapper}>
      <div style={{ padding: "5px" }}>
        <Header />
      </div>
      <div style={{ padding: "5px", flex: "1" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
