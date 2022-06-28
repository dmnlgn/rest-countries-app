import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router";
import {
  fetchData,
  countriesSelector,
  clearCountries,
} from "../redux/slices/countriesSlice";

import "./Country.less";

const Country = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { title } = useParams();
  const { countries } = useSelector(countriesSelector);

  useEffect(() => {
    dispatch(fetchData({ type: "findCountry", query: title }));
    return () => dispatch(clearCountries());
  }, [dispatch]);

  const onClick = () => {
    history("/");
  };

  return (
    <>
      <div className="country wrapper">
        <div className="country-box-button">
          <input
            className="btn"
            type="button"
            value="GO TO PREVIOUS PAGE"
            onClick={onClick}
          />
        </div>
        <div className="country-box">
          <div className="country-box-wrapper">
            <table>
            <tbody>
              <tr>
                <td className="label">NAME</td>
                <td>{countries.name}</td>
              </tr>
              <tr>
                <td className="label">CAPITAL NAME</td>
                <td>{countries.capital}</td>
              </tr>
              <tr>
                <td className="label">CURRENCIES CODE</td>
                <td>{countries.currencies?.map((el) => el.code)}</td>
              </tr>
              <tr>
                <td className="label">CURRENCIES NAME</td>
                <td>{countries.currencies?.map((el) => el.name)}</td>
              </tr>
              <tr>
                <td className="label">CURRENCIES SYMBOL</td>
                <td>{countries.currencies?.map((el) => el.symbol)}</td>
              </tr>
              </tbody>
            </table>
            {/* <div className="country-box-element">
              <label>NAME:</label>
              {countries.name}
            </div>
            <div className="country-box-element">
              <label>CAPITAL NAME:</label>
              {countries.capital}
            </div>
            <div className="country-box-element">
              <label>CURRENCIES CODE:</label>
              {countries.currencies?.map((el) => el.code)}
            </div>
            <div className="country-box-element">
              <label>CURRENCIES NAME:</label>
              {countries.currencies?.map((el) => el.name)}
            </div>
            <div className="country-box-element">
              <label>CURRENCIES SYMBOL:</label>
              {countries.currencies?.map((el) => el.symbol)}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
