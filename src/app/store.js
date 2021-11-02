import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../slices/favoritesSlice";

// The Global store setup
export default configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
