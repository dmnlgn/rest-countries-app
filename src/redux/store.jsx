import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./slices/countriesSlice";

const rootReducer = combineReducers({ countries: countriesReducer });

export default configureStore({
  reducer: rootReducer,
});
