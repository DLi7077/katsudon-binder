import { createSlice } from "@reduxjs/toolkit";
import { LOCALSTORAGE_KEYS } from "../../constants";

export type FilterState = {
  rarities: string[];
  sets: string[];
  artist: string;
  cardName: string;
  owned: string[];
  showOwned: boolean;
};

function getObjectFromLS<T>(key: string, fallback: T): T {
  const lsItem = localStorage.getItem(key);
  return lsItem == null ? fallback : JSON.parse(lsItem);
}
function getFromLS(key: string, fallback: string): string {
  return localStorage.getItem(key) ?? fallback;
}
const defaultState: FilterState = {
  rarities: getObjectFromLS(LOCALSTORAGE_KEYS.RARITIES, []),
  sets: getObjectFromLS(LOCALSTORAGE_KEYS.SETS, []),
  artist: getFromLS(LOCALSTORAGE_KEYS.ARTIST, ""),
  cardName: getFromLS(LOCALSTORAGE_KEYS.CARDNAME, ""),
  owned: [],
  showOwned: false,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: defaultState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateSet: (state, action) => {
      state.owned = action.payload;
    },
  },
});

export const { setFilters } = filterSlice.actions;

export default filterSlice.reducer;
