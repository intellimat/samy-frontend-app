import { ImageData } from "../../types";
import styles from "./card.module.css";
import FullHeart from "../../assets/icons/full-heart.svg?react";
import EmptyHeart from "../../assets/icons/empty-heart.svg?react";
import ForwardIcon from "../../assets/icons/arrow-right-forward.svg?react";
import React from "react";

interface Props {
  imageData: ImageData;
  onLikeClick: (id: string) => void;
}

const Card: React.FC<Props> = ({ imageData, onLikeClick }) => {
  const { title, price, author, picture, liked, likesCount } = imageData;
  return (
    <div className={styles.card}>
      <div className={styles.price}>{price}€</div>
      <img src={picture} className={styles.picture} alt={title + " image"} />
      <div className={styles.information}>
        <div className={styles.title}> {title} </div>
        <div className={styles.subtitle}>
          <span className={styles.by}>by </span>
          <span className={styles.author}>{author}</span>
        </div>
      </div>
      <div className={styles.userInteraction}>
        <div className={styles.likesContainer}>
          {liked ? (
            <FullHeart
              role="button"
              cursor={"pointer"}
              onClick={() => onLikeClick(imageData.id)}
            />
          ) : (
            <EmptyHeart
              role="button"
              cursor={"pointer"}
              onClick={() => onLikeClick(imageData.id)}
            />
          )}
          <div>{likesCount}</div>
        </div>
        <div className={styles.forwardedContainer}>
          <ForwardIcon className={styles.forwardIcon} />
          <div>0</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
