import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filters";
import displayReducer from "./reducers/display";
import { FilterState } from "./reducers/filters";
import { DisplayState } from "./reducers/display";

export interface RootState {
  filter: FilterState;
  display: DisplayState;
}

const store = configureStore({
  reducer: {
    filter: filterReducer,
    display: displayReducer,
  },
});

export default store;
