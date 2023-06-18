import { useState } from "react";
import styles from "./Sidebar.module.css";
import SidebarUser from "./SIdebarUser/SidebarUser";
import SidebarButton from "./SidebarButton/SidebarButton";

const Sidebar = ({ className }) => {
  const [activePage, setActivePage] = useState("/");

  const navbarItemStyle = (to) => {
    return `${styles.navbarItem} ${activePage === to ? styles.active : ""}`;
  };

  return (
    <aside className={className}>
      <SidebarUser />
      <hr className={styles.divider} />
      <nav>
        <ul className={styles.navbarList}>
          <li className={navbarItemStyle("/")}>
            <SidebarButton
              to={"/"}
              src={"../images/sidebar/home-icon.svg"}
              alt="home-icon"
              width={"30px"}
              label={"Home"}
              handleClick={() => setActivePage("/")}
            />
          </li>
          <li className={navbarItemStyle("/games/lol")}>
            <SidebarButton
              to={"/games/lol"}
              src="../images/sidebar/lol-icon.webp"
              alt="lol-icon"
              width={"30px"}
              label={"League of Legends"}
              handleClick={() => setActivePage("/games/lol")}
            />
          </li>
          <li className={navbarItemStyle("/games/valorant")}>
            <SidebarButton
              to={"/games/valorant"}
              src="../images/sidebar/valorant-icon.webp"
              alt="valorant-icon"
              width={"30px"}
              label={"Valorant"}
              handleClick={() => setActivePage("/games/valorant")}
            />
          </li>
          <li className={navbarItemStyle("/games/apex")}>
            <SidebarButton
              to={"/games/apex"}
              src="../images/sidebar/apex-icon.webp"
              alt="apex-icon"
              width={"30px"}
              label={"Apex Legends"}
              handleClick={() => setActivePage("/games/apex")}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
