import styles from "./card.module.css";
import React from "react";

interface Props {
  id: string;
  title: string;
  price: number;
  picture: string;
  liked: boolean;
  likesCount: number;
  author: string;
}

const Card: React.FC<Props> = ({
  title,
  price,
  author,
  picture,
  liked,
  likesCount,
}) => {
  return (
    <div className={styles.card}>
      <img src={picture} className={styles.picture} alt={title + " image"} />
      <div className={styles.information}>
        <div className={styles.title}> {title} </div>
        <div className={styles.subtitle}> {author}</div>
      </div>
    </div>
  );
};

export default Card;
