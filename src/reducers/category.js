import { GET_CATEGORIES } from "../constants";

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return [...action.categories];
    default:
      return state;
  }
};

export default categoryReducer;
