import React from "react";

import { AiOutlinePlus } from "react-icons/ai";

const Product = ({ product }) => {
  const { name, price } = product;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <li>
      <img src={window.location.origin + `/images/${name}.svg`} alt="product" />
      <p>{capitalizeFirstLetter(name)}</p>
      <p>{price} €</p>
      <button>
        <AiOutlinePlus />
      </button>
    </li>
  );
};

export default Product;
