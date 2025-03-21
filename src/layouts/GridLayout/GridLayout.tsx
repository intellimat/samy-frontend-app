import React, { ReactNode } from "react";
import styles from "./cardsLayout.module.css";

interface Props {
  elements: ReactNode[];
  className?: string;
}

const GridLayout: React.FC<Props> = ({ elements, className }) => {
  return (
    <div className={`${styles.gridLayout} ${className || ""}`}>{elements}</div>
  );
};

export default GridLayout;
