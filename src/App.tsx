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
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

function App() {
  const [query, setQuery] = useState<string>("");
  const [isFirstLoading, setIsFirstLoading] = useState(true); // prevents calling fetchMore on first render

  const { data, loading, fetchMore } = useQuery<ImagesResponseType>(
    GET_IMAGES,
    {
      variables: { first: 10 },
      notifyOnNetworkStatusChange: true,
      onCompleted: () => setIsFirstLoading(false), // Mark first load as done
    }
  );
  const filteredImages = useFilter(query, data?.images?.edges);
  const { sendImageLikeRequest } = useMutateData();

  // Using the custom hook for infinite scrolling
  const { bottomElementRef } = useInfiniteScroll({
    hasNextPage: data?.images?.pageInfo?.hasNextPage,
    isLoading: loading || isFirstLoading,
    fetchMore,
    endCursor: data?.images?.pageInfo?.endCursor || null,
  });

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
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
      {/* Empty div at the bottom to act as the trigger for intersection observer */}
      <div ref={bottomElementRef}></div>
      {loading && <div>Loading...</div>}
    </>
  );
}

export default App;
