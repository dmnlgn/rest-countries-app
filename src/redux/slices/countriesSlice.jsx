import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  hasErrors: false,
  countries: [],
  currentPaginate: 1,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getCountries: (state) => {
      state.status = "loading";
    },
    getCountriesSuccess: (state, { payload }) => {
      state.countries = payload?.payload;
      state.status = "success";
      state.hasErrors = false;
    },
    getCountriesFailure: (state) => {
      state.status = "failed";
      state.hasErrors = true;
    },
    clearCountries: (state, action) => initialState,
    changePaginate: (state, { payload }) => {
      state.currentPaginate = payload;
    },
  },
});

// Actions generated from the slice
export const {
  getCountries,
  getCountriesSuccess,
  getCountriesFailure,
  clearCountries,
  changePaginate,
} = countriesSlice.actions;

// A selector
export const countriesSelector = (state) => state.countries;

// The reducer
export default countriesSlice.reducer;

// Asynchronous thunk action
export const fetchData = ({ type, query }) => {
  let API = "";
  let axiosData = {};
  switch (type) {
    case "getAll": {
      API = "http://localhost:8080/countries";
      axiosData = {
        method: "GET",
        url: API,
      };
      break;
    }
    case "findCountry": {
      API = "http://localhost:8080/countries/find";
      axiosData = {
        method: "POST",
        url: API,
        data: {
          query,
        },
      };
      break;
    }
    case "filterCountry": {
      API = "http://localhost:8080/countries";
      axiosData = {
        method: "POST",
        url: API,
        data: {
          query,
        },
      };
      break;
    }
  }

  return async (dispatch) => {
    dispatch(getCountries());
    await axios(axiosData)
      .then((response) => {
        dispatch(
          getCountriesSuccess({
            payload: response.data,
          }),
        );
      })
      .catch((error) => {
        dispatch(
          getCountriesFailure({
            status: "error",
            payload: error,
          }),
        );
      });
  };
};
