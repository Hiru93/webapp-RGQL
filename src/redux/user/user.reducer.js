import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null
};

/** 
 * Due to es6, we can pass a parameter (as state) with a default value using the syntax param = default_value 
 * */
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;