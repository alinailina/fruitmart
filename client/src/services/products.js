import axios from "axios";
const baseUrl = "/api/products";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

// eslint-disable-next-line
export default { getAll };
