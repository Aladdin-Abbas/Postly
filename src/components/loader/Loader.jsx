import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles["loader-wrapper"]} data-testid="loader">
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
