import { act, render, screen } from "@testing-library/react";
import LaunchItem from "./LaunchItem";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../../slices/favoritesSlice";

describe("LaunchItem", () => {
  const favReducer = {
    reducer: {
      favorites: favoritesReducer,
    },
  };
  const mockStore = configureStore(favReducer);

  it("renders launches data", async () => {
    const fakeLaunch = {
      flight_number: 1,
      mission_name: "Test",
      launch_year: "2006",
      launch_success: true,
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeLaunch),
      })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () =>
      render(
        <Provider store={mockStore}>
          <LaunchItem launch={fakeLaunch} />
        </Provider>
      )
    );
    expect(screen.getByText("Test")).toBeInTheDocument();

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
});
