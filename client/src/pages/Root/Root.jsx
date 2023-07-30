import { Header, Submit } from "../../components";
import { Outlet, useLocation } from "react-router-dom";
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
  const location = useLocation();
  console.log(location);

  return (
    <div className={styles.wrapper}>
      <div style={{ padding: "5px" }}>
        {/* isRootPage={href === "/"} */}
        <Header />
      </div>
      <div style={{ padding: "5px", flex: "1" }}>
        {location.pathname === "/" && <Submit />}
        <Outlet />
      </div>
      <footer>footer</footer>
    </div>
  );
}

export default Root;
export { loader };
