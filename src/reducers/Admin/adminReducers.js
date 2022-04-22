import {
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_FAIL,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNOUT,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS
} from "../../constants/adminConstants";

export const adminSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_SIGNIN_REQUEST:
      return { loading: true };
    case ADMIN_SIGNIN_SUCCESS:
      return {
        loading: false,
        adminInfo: action.payload,
      };
    case ADMIN_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userlistReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
  };
  export const createUserReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return { loading: true }
        case CREATE_USER_SUCCESS:
            return { loading: false, success: true, user: action.payload };
        case CREATE_USER_FAIL:
            return { loading: false,success:false, error: action.payload };
        
        default:
            return state;
    }
}

