import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchData, countriesSelector } from "../redux/slices/countriesSlice";

import Box from "../components/Box/Box";

const HomePage = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector(countriesSelector);

  const dispatchData = () => {
    dispatch(
      fetchData({
        type: "getAll",
      }),
    );
  };

  useEffect(() => {
    dispatchData();
  }, [dispatch]);

  return (
    <>
      <div className="homepage wrapper">
        <Box countries={countries} dispatchData={dispatchData} />
      </div>
    </>
  );
};

export default HomePage;
