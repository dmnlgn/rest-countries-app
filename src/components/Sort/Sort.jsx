import _ from "lodash";
import React, { useState } from "react";

import "./Sort.less";

const Sort = (props) => {
  const sortByAsc = () => {
    const sorted = _.sortBy(props.data, "name");
    props.getSortedData(sorted);
  };

  const sortByDesc = () => {
    const sorted = _.sortBy(props.data, "name").reverse();
    props.getSortedData(sorted);
  };

  return (
    <>
      <div className="sort">
        <div className="sort-box-header">Sort</div>
        <div className="sort-box-content">
          <div className="sort-box-content-element" onClick={sortByAsc}>
            - Sortowanie: A-Z
          </div>
          <div className="sort-box-content-element" onClick={sortByDesc}>
            - Sortowanie: Z-A
          </div>
        </div>
      </div>
    </>
  );
};

export default Sort;
