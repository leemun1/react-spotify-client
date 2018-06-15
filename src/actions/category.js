import { GET_CATEGORIES } from "../constants";

// Fetch Notes
export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

export const startGetCategories = requestHeader => {
  return dispatch => {
    // get categories from spotify API
    return fetch(
      "https://api.spotify.com/v1/browse/categories?limit=50",
      requestHeader
    )
      .then(response => response.json())
      .then(data => {
        const categories = data.categories.items.slice(1);
        dispatch(getCategories(categories));
      });
  };
};
