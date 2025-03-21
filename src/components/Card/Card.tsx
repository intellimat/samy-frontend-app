import { ImageData } from "../../types";
import styles from "./card.module.css";
import React from "react";

interface Props {
  imageData: ImageData;
}

const Card: React.FC<Props> = ({ imageData }) => {
  const { title, price, author, picture, liked, likesCount } = imageData;
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
