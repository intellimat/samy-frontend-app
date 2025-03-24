import { useQuery } from "@apollo/client";
import styles from "./App.module.css";
import { GET_IMAGES } from "./services/queries";
import { ImageData, ImagesResponseType } from "./types";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import { useMemo, useState } from "react";
import GridLayout from "./layouts/GridLayout/GridLayout";
import { useMutateData } from "./hooks/useMutateData";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 1000);
  const [isFirstLoading, setIsFirstLoading] = useState(true); // prevents calling fetchMore on first render

  const { data, loading /*, fetchMore*/ } = useQuery<ImagesResponseType>(
    GET_IMAGES,
    {
      variables: { first: 10, title: debouncedQuery },
      fetchPolicy: "network-only", // Always fetch from the network
      notifyOnNetworkStatusChange: true,
      onCompleted: () => setIsFirstLoading(false),
    }
  );
  const listOfImages = useMemo(() => data?.images?.edges || [], [data]);

  const { sendImageLikeRequest } = useMutateData();

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      {!isFirstLoading && listOfImages.length > 0 && (
        <GridLayout
          className={styles.gridLayout}
          elements={listOfImages.map(({ node }: { node: ImageData }) => (
            <Card
              key={node.id}
              imageData={node}
              onLikeClick={sendImageLikeRequest}
            />
          ))}
        />
      )}
      {loading && <div>Loading...</div>}
    </>
  );
}

export default App;
