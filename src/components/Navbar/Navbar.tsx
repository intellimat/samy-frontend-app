import React from "react";
import styles from "./navbar.module.css";
import Searchbar from "../Searchbar/Searchbar";
import SamyLogo from "../../assets/SAMY_logo.svg?react";

interface Props {
  query: string;
  setQuery: (query: string) => void;
}
const Navbar: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <nav className={styles.navbar}>
      <SamyLogo />
      <Searchbar query={query} setQuery={setQuery} />
    </nav>
  );
};

export default Navbar;
