import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePaginate,
  countriesSelector,
} from "../../redux/slices/countriesSlice";
import "./Pagination.less";

const Pagination = (props) => {
  const dispatch = useDispatch();
  const { currentPaginate } = useSelector(countriesSelector);
  const [currentPage, setCurrentPage] = useState(1);

  const boxPerPage = 5;
  const fetchData = props.data;

  const indexOfLastTodo = currentPage * boxPerPage;
  const indexOfFirstTodo = indexOfLastTodo - boxPerPage;
  const renderFetchedData = fetchData?.slice(indexOfFirstTodo, indexOfLastTodo);

  useEffect(() => {
    if (renderFetchedData) {
      props.getPaginateData(renderFetchedData);
    }
  }, [currentPage, props.data]);

  useEffect(() => {
    if (currentPaginate) {
      setCurrentPage(currentPaginate);
    }
  }, [dispatch, currentPaginate]);

  const renderHandleClick = (event) => {
    setCurrentPage(event.target.id);
    dispatch(changePaginate(event.target.id));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(fetchData?.length / boxPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number, index) => {
      return (
        <div
          key={index}
          id={number}
          onClick={renderHandleClick}
          className="pagination-element">
          {number}
        </div>
      );
    });
  };

  return (
    fetchData.length > 5 && (
      <div className="pagination">{renderPageNumbers()}</div>
    )
  );
};

export default Pagination;
