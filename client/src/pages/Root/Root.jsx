import { Header } from "../../components";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./Root.module.css";
import userService from "../../services/user";

const loader = async () => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData).id : null;
  let updatedUser = null;

  if (!user) {
    updatedUser = await userService.create();
  } else {
    try {
      updatedUser = await userService.getUser(user);
    } catch (err) {
      localStorage.removeItem("updatedUser");
      updatedUser = await userService.create();
    }
  }

  localStorage.setItem("user", JSON.stringify(updatedUser));
  return updatedUser;
};

function Root() {
  return (
    <div className={styles.wrapper}>
      <div style={{ padding: "5px" }}>
        {/* isRootPage={href === "/"} */}
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
