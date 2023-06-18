import styles from "./HeaderNavbar.module.css";

const Navbar = ({ children }) => {
  return (
    <div>
      <nav>
        <ul className={styles.navbarList}>{children}</ul>
      </nav>
    </div>
  );
};

export default Navbar;
