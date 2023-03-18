import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className={styles.header}>
      <section>
        <Link to="/">Postly</Link>
      </section>
    </nav>
  );
};

export default Header;
