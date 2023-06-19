import styles from "./Sidebar.module.css";
import SidebarUser from "./SIdebarUser/SidebarUser";
import SidebarButton from "./SidebarButton/SidebarButton";

const Sidebar = ({ className, children, setActivePage, activePage }) => {
  const navbarItemStyle = (to) => {
    return `${styles.navbarItem} ${activePage === to ? styles.active : ""}`;
  };

  return (
    <aside className={className}>
      <SidebarUser />
      <hr className={styles.divider} />
      <nav>
        {children}
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
          <li className={navbarItemStyle("/games/csgo")}>
            <SidebarButton
              to={"/games/csgo"}
              src="../images/sidebar/csgo-icon.webp"
              alt="csgo-icon"
              width={"30px"}
              label={"Counter-Strike: GO"}
              handleClick={() => setActivePage("/games/csgp")}
            />
          </li>
          <hr className={styles.divider} />
          <li className={styles.navbarItem}>
            <SidebarButton
              type="link"
              to={"https://github.com/AH134/Rankdle-v2"}
              src="../images/sidebar/github-icon.svg"
              alt="apex-icon"
              width={"30px"}
              label={"Github"}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
