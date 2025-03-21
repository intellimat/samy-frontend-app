import { useQuery } from "@apollo/client";
import styles from "./App.module.css";
import { GET_IMAGES } from "./services/queries";
import { ImageData, ImagesResponseType } from "./types";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import { useState } from "react";
import useFilter from "./hooks/useFilter";
import GridLayout from "./layouts/GridLayout/GridLayout";

function App() {
  const { data } = useQuery<ImagesResponseType>(GET_IMAGES);
  const [query, setQuery] = useState<string>("");
  const filteredImages = useFilter(query, data?.images?.edges);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <GridLayout
        className={styles.gridLayout}
        elements={filteredImages.map(({ node }: { node: ImageData }) => (
          <Card imageData={node} />
        ))}
      />
    </>
  );
}

export default App;
