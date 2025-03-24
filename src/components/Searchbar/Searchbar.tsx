import React from "react";
import styles from "./searchbar.module.css";
import SearchIcon from "../../assets/icons/lens.svg?react";

interface Props {
  query: string;
  setQuery: (query: string) => void;
  className?: string;
}

const Searchbar: React.FC<Props> = ({ query, setQuery, className }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className={`${styles.inputWrapper} ${className || ""}`}>
      <SearchIcon />
      <input
        type="text"
        className={styles.textInput}
        value={query}
        onChange={handleInputChange}
        placeholder="You're looking for something?"
      />
    </div>
  );
};

export default Searchbar;
