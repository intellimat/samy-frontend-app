import { useQuery } from "@apollo/client";
import styles from "./App.module.css";
import { GET_IMAGES } from "./services/queries";
import { ImageData, ImagesResponseType } from "./types";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo, useState } from "react";
import { useMutateData } from "./hooks/useMutateData";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 1000);

  const { data, fetchMore } = useQuery<ImagesResponseType>(GET_IMAGES, {
    variables: { first: 10, title: debouncedQuery },
    fetchPolicy: "network-only", // Always fetch from the network
    notifyOnNetworkStatusChange: true,
  });

  const listOfImages = useMemo(() => data?.images?.edges || [], [data]);

  const { sendImageLikeRequest } = useMutateData();

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      {listOfImages.length > 0 && (
        <InfiniteScroll
          className={styles.gridContainer}
          dataLength={listOfImages.length}
          next={() =>
            fetchMore({
              variables: {
                after: data?.images.pageInfo.endCursor,
                title: query,
              },
            })
          }
          hasMore={data?.images.pageInfo.hasNextPage || false}
          loader={<div>Loading...</div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {listOfImages.map(({ node }: { node: ImageData }) => (
            <Card
              key={node.id}
              imageData={node}
              onLikeClick={sendImageLikeRequest}
            />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}

export default App;
