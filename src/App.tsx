import { useQuery } from "@apollo/client";
import styles from "./App.module.css";
import { GET_IMAGES } from "./services/queries";
import { ImageData } from "./types";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";

function App() {
  const { data } = useQuery(GET_IMAGES);
  return (
    <>
      <Navbar />
      <div className={styles.cardsContainer}>
        {data?.images?.edges.map(({ node }: { node: ImageData }) => (
          <Card
            id={node.id}
            title={node.title}
            price={node.price}
            picture={node.picture}
            liked={node.liked}
            likesCount={node.likesCount}
            author={node.author}
          />
        ))}
      </div>
    </>
  );
}

export default App;
