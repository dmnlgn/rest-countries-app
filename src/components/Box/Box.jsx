import React, { useEffect, useState } from "react";
import CountryItems from "../CountryItems/CountryItems";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import Sort from "../Sort/Sort";

import "./Box.less";

const Box = (props) => {
  const [data, setFetchData] = useState([]);
  const [paginateData, setPagianteData] = useState([]);

  useEffect(() => {
    setFetchData(props.countries);
  }, [props.countries]);

  const getSortedData = (sorted) => {
    setFetchData(sorted);
  };

  const getPaginateData = (paginate) => {
    setPagianteData(paginate);
  };

  return (
    <>
      <div className="box">
        <div className="box-content">
          <div className="box-content-sidebar">
            <Sort data={data} getSortedData={getSortedData} />
          </div>
          <div className="box-content-main">
            <Search dispatchData={props.dispatchData} />
            <div className="countries">
              <div className="countries-box">
                {paginateData?.map((element, index) => (
                  <CountryItems name={element?.name} key={index} />
                ))}
              </div>
            </div>
            <Pagination data={data} getPaginateData={getPaginateData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Box;
