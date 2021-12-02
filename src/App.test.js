import { render, screen } from "@testing-library/react";
import App from "./App";
import IntersectionObserver from "intersection-observer";

describe("App", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    render(<App />, div);
  });

  it("should render the App component", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent("SpaceX");
  });
});
