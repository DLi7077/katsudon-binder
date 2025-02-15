import { createSlice } from "@reduxjs/toolkit";

export type DisplayState = {
  pages: Pokemon[][];
  rows: number;
  columns: number;
  page: number;
  spotlightPokemon: Pokemon | null;
  isLoading: boolean;
  isSmallScreen: boolean;
};

const defaultState: DisplayState = {
  pages: JSON.parse(localStorage.getItem("pages") ?? "[]"),
  rows: 3,
  columns: 3,
  page: 0,
  spotlightPokemon: null,
  isLoading: false,
  isSmallScreen: false,
};

export const displaySlice = createSlice({
  name: "display",
  initialState: defaultState,
  reducers: {
    setDisplay: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setDisplay } = displaySlice.actions;

export default displaySlice.reducer;
