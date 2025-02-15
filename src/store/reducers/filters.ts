import { createSlice } from "@reduxjs/toolkit";
import { LOCALSTORAGE_KEYS } from "../../constants";

export type FilterState = {
  rarities: string[];
  sets: string[];
  artist: string;
  cardName: string;
  owned: string[];
  showOwned: "All" | "Owned" | "Unowned";
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
  owned: getObjectFromLS(LOCALSTORAGE_KEYS.OWNED, []),
  showOwned: "All",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: defaultState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeFromOwned: (state, action) => {
      state.owned = state.owned.filter((id) => id != action.payload);
      localStorage.setItem(LOCALSTORAGE_KEYS.OWNED, JSON.stringify(state.owned));
    },
    addToOwned: (state, action) => {
      state.owned = [...state.owned, action.payload];
      localStorage.setItem(LOCALSTORAGE_KEYS.OWNED, JSON.stringify(state.owned));
    },
  },
});

export const { setFilters, removeFromOwned, addToOwned } = filterSlice.actions;

export default filterSlice.reducer;
