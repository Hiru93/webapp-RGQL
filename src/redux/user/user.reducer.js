import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

/** 
 * Due to es6, we can pass a parameter (as state) with a default value using the syntax param = default_value 
 * */
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * With this  notation both of the cases have the same return
     */
    case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;