import productsService from "../services/products";

const products = (state = [], action) => {
  switch (action.type) {
    case "INIT_PRODUCTS":
      return action.products;

    default:
      return state;
  }
};

export const initProducts = () => {
  return async (dispatch) => {
    const products = await productsService.getAll();
    dispatch({
      type: "INIT_PRODUCTS",
      products,
    });
  };
};

export default products;
