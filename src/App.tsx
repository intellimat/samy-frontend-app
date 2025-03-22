import { useQuery } from "@apollo/client";
import styles from "./App.module.css";
import { GET_IMAGES } from "./services/queries";
import { ImageData, ImagesResponseType } from "./types";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import { useState } from "react";
import useFilter from "./hooks/useFilter";
import GridLayout from "./layouts/GridLayout/GridLayout";
import { useMutateData } from "./hooks/useMutateData";

function App() {
  const [query, setQuery] = useState<string>("");
  const { data, fetchMore } = useQuery<ImagesResponseType>(GET_IMAGES, {
    variables: { first: 10 },
    notifyOnNetworkStatusChange: true,
  });
  const filteredImages = useFilter(query, data?.images?.edges);
  const { sendImageLikeRequest } = useMutateData();

  const loadMore = () => {
    if (data?.images?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.images.pageInfo.endCursor },
      });
    }
  };

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <button onClick={loadMore}> Load More</button>
      <GridLayout
        className={styles.gridLayout}
        elements={filteredImages.map(({ node }: { node: ImageData }) => (
          <Card
            key={node.id}
            imageData={node}
            onLikeClick={sendImageLikeRequest}
          />
        ))}
      />
    </>
  );
}

export default App;
