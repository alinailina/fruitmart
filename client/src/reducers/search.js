const search = (state = "", action) => {
  switch (action.type) {
    case "SEARCH":
      return action.query;

    default:
      return state;
  }
};

export const setQuery = (query) => {
  return {
    type: "SEARCH",
    query,
  };
};

export default search;
