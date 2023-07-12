import Header from "../../components/Header/Header";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./Root.module.css";
import userService from "../../services/user";

const loader = async () => {
  const getUser = JSON.parse(localStorage.getItem("user"));

  if (getUser.id) {
    const user = await userService.getUser(getUser.id);

    const date = new Date();
    const userDate = new Date(user.updatedAt);

    const userUpdateDate =
      userDate.getFullYear() + userDate.getMonth() + userDate.getDate();
    const currDate = date.getFullYear() + date.getMonth() + date.getDate();

    const updateUser = userUpdateDate < currDate;

    if (user && updateUser) {
      const user = await userService.updateGame(getUser.id);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    }
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  const user = await userService.create();
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

function Root() {
  const user = useLoaderData();
  return (
    <div className={styles.wrapper}>
      <div style={{ padding: "5px" }}>
        <Header />
      </div>
      <div style={{ padding: "5px", flex: "1" }}>
        <Outlet context={user} />
      </div>
    </div>
  );
}

export default Root;
export { loader };
