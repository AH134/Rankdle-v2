import { Header } from "../../components";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./Root.module.css";
import userService from "../../services/user";

const loader = async () => {
  const userId = localStorage.getItem("user");
  let user = null;

  if (!userId) {
    user = await userService.create();
  } else {
    try {
      user = await userService.getUser(userId);
    } catch (err) {
      localStorage.removeItem("user");
      user = await userService.create();
    }
  }
  localStorage.setItem("user", user.id);
  const games = user.games;

  return games;
};

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
export { loader };
