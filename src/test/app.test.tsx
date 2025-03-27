import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "./mocks";
import { ImagesResponseType } from "../types";
import { InMemoryCache } from "@apollo/client";
import { inMemoryCache } from "../services/apolloClient";

// Mock nanoid to return a fixed string
vi.mock("nanoid", async () => {
  return {
    nanoid: () => "mockedId", // so clientMutationId will be mockedId
  };
});

const renderApp = (typename?: boolean, inMemoryCache?: InMemoryCache) => {
  render(
    <MockedProvider mocks={mocks} addTypename={typename} cache={inMemoryCache}>
      <App />
    </MockedProvider>
  );
};

describe("App", () => {
  it("should display a navbar", () => {
    renderApp();
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  it("should display a searchbar", async () => {
    renderApp();

    const searchInput = await screen.findByPlaceholderText(
      "You're looking for something?"
    );
    expect(searchInput).toBeInTheDocument();
  });

  it("should get new data when typing on the searchbar", async () => {
    const imageNode = (mocks[0].result.data as ImagesResponseType).images
      .edges[1].node;

    renderApp();

    const searchInput = await screen.findByPlaceholderText(
      "You're looking for something?"
    );

    fireEvent.change(searchInput, { target: { value: imageNode.title } });

    expect(await screen.findByAltText(imageNode.title)).toBeInTheDocument();
  });

  it("should display as many cards as the cards returned by the service", async () => {
    renderApp();

    const cards = await screen.findAllByTestId("card");

    expect(cards.length).toBe(
      (mocks[0].result.data as ImagesResponseType).images.edges.length
    );
  });

  it("should mutate the card image on heart button click", async () => {
    const imageNode = (mocks[0].result.data as ImagesResponseType).images
      .edges[0].node;

    renderApp(true, inMemoryCache);

    const heartButton = await screen.findByTitle("heart-icon-" + imageNode.id);

    fireEvent.click(heartButton);

    expect(await screen.findByText("11")).toBeInTheDocument(); // Likes count updated from 10 → 11
  });
});
