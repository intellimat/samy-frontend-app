import React from "react";
import styles from "./navbar.module.css";
import Searchbar from "../Searchbar/Searchbar";
import SamyLogo from "../../assets/SAMY_logo.svg?react";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <SamyLogo />
      <Searchbar query={""} setQuery={() => {}} />
    </nav>
  );
};

export default Navbar;
