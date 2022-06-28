import React from "react";

import { Link } from "react-router-dom";

import "./CountryItems.less";

const CountryItems = (props) => {
  return (
    <>
      <Link to={`/country/${props.name}`}>
        <div className="country-items">
          <p>{props.name}</p>
        </div>
      </Link>
    </>
  );
};

export default CountryItems;
