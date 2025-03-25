import { render, screen } from "@testing-library/react";
import App from "../App";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "./mocks";

describe("App", () => {
  test("should display a navbar", () => {
    render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });
});
