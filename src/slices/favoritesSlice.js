import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Actions
    addToFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFromFavorites: (state, action) => {
      const index = state.favorites.findIndex(
        (fav) => fav.id === action.payload.mission_name
      );

      let newFavorites = [...state.favorites];

      if (index >= 0) {
        newFavorites.splice(index, 1);
      } else {
        console.warn(
          `Can't remove favorite (id: ${action.payload.mission_name} as it's not in the favorites)`
        );
      }

      state.favorites = newFavorites;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state) => state.favorites.favorites;

export default favoritesSlice.reducer;
