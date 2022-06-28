import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchData,
  clearCountries,
  changePaginate,
} from "../../redux/slices/countriesSlice";
import "./Search.less";

const Search = (props) => {
  const [clearButton, setClearButton] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;

    setSearchValue(value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(changePaginate(1));
    dispatch(fetchData({ type: "filterCountry", query: searchValue }));
  };

  const onInput = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }

    if (value.length > 2) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const resetValue = () => {
    setSearchValue("");
    setClearButton(false);
    setDisableButton(true);
    dispatch(clearCountries());
    props.dispatchData();
  };

  return (
    <>
      <div className="search" onSubmit={handleSubmit}>
        <form className="search-form">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              onChange={handleChange}
              onInput={onInput}
              value={searchValue}
            />
            {clearButton && (
              <button
                type="button"
                className="clear-button-inside"
                onClick={resetValue}>
                x
              </button>
            )}
          </div>
          <button
            type="submit"
            className="search-button"
            disabled={disableButton}>
            SZUKAJ
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
