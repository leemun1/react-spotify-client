import { GET_ACCESS_TOKEN } from "../constants";

const authReducer = (state = "", action) => {
  switch (action.type) {
    case GET_ACCESS_TOKEN:
      return action.accessToken;
    default:
      return state;
  }
};

export default authReducer;
