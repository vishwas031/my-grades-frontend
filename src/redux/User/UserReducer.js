import { ADMIN_TOKEN, SET_USER } from "./UserTypes";

const initialState = {
  user: null,
  token: null,
};

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case ADMIN_TOKEN:
      return { ...state, token: action.payload.token };
    default:
      return state;
  }
}

export default UserReducer;
