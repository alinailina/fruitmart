import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";

const Products = () => {
  const products = useSelector((state) => {
    switch (state.filter) {
      case "ALL":
        return state.products;
      case "FRUITS":
        return state.products.filter((product) => product.category === "fruit");
      case "VEGETABLES":
        return state.products.filter(
          (product) => product.category === "vegetable"
        );
      default:
        return state.products;
    }
  });

  return (
    <ul id="products">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
    </ul>
  );
};

export default Products;
