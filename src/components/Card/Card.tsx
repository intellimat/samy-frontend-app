import { ImageData } from "../../types";
import styles from "./card.module.css";
import LikesIcon from "../../assets/icons/likes-icon.svg?react";
import React from "react";

interface Props {
  imageData: ImageData;
}

const Card: React.FC<Props> = ({ imageData }) => {
  const { title, price, author, picture, liked, likesCount } = imageData;
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.price}>{price}€</div>
        <img src={picture} className={styles.picture} alt={title + " image"} />
        {liked && (
          <div className={styles.likesContainer}>
            <LikesIcon className={styles.likesIcon} />
            {likesCount}
          </div>
        )}
      </div>
      <div className={styles.information}>
        <div className={styles.title}> {title} </div>
        <div className={styles.subtitle}>
          <span className={styles.by}>by </span>
          <span className={styles.author}>{author}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
