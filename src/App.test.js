import { render, screen } from "@testing-library/react";
import App from "./App";
import IntersectionObserver from "intersection-observer";

test("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App />, div);
});
