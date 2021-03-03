import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../reducers/filter";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  return (
    <div id="filter">
      <label htmlFor="filter">
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(setFilter("ALL"))}
          checked={filter === "ALL" ? true : false}
        />{" "}
        All
      </label>
      <label htmlFor="filter">
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(setFilter("FRUITS"))}
          checked={filter === "FRUITS" ? true : false}
        />{" "}
        Fruits
      </label>
      <label htmlFor="filter">
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(setFilter("VEGETABLES"))}
          checked={filter === "VEGETABLES" ? true : false}
        />{" "}
        Vegetables
      </label>
    </div>
  );
};

export default Filter;
