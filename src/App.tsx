import { useQuery } from "@apollo/client";
import "./App.css";
import { GET_IMAGES } from "./services/queries";
import { ImageData } from "./types";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { data } = useQuery(GET_IMAGES);
  return (
    <>
      <Navbar />
      <div>
        {data?.images?.edges.map(({ node }: { node: ImageData }) => (
          <div key={node.id}>
            <h3>{node.title}</h3>
            <img src={node.picture} alt={node.title} />
            <p>Price: ${node.price}</p>
            <p>Likes: {node.likesCount}</p>
            <p>Liked: {node.liked ? "Yes" : "No"}</p>
            <p>Author: {node.author}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
