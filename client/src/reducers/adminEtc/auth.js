import {
  USER_LOADED,
  // ALL_USERS_LOADED,
  SET_AUTH_USER_LOADING,
  UNSET_AUTH_USER_LOADING,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_COORDINATOR_SUCCESS,
  REGISTER_COORDINATOR_FAILED,
  REGISTER_FACULTY_FAILED,
  REGISTER_FACULTY_SUCCESS,
  REGISTER_UNDERGRADUATE_STUDENT_SUCCESS,
  REGISTER_UNDERGRADUATE_STUDENT_FAILED,
  NAME_UPDATED,
  PASSWORD_UPDATED,
  PROFILE_PICTURE_UPLOADED,
  PROFILE_PICTURE_REMOVED,
} from '../../actions/adminEtc/types';

import { 
  FACULTY_LOADED,
  ACCOUNT_DELETED
} from '../../actions/facultysc/types';
 
const initialState = {
  user: null,
  loading: true,
  isAuthenticated: null,
  token: localStorage.getItem('token'),
  users: [],
  userLoading: true,
  errors: null,
  faculty : null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        loading: false,
        userLoading: false,
        isAuthenticated: true,
        token: payload
      };
    case USER_LOADED:
    case NAME_UPDATED:
    case PROFILE_PICTURE_UPLOADED:
    case PROFILE_PICTURE_REMOVED:
      return {
        ...state,
        loading: false,
        userLoading: false,
        isAuthenticated: true,
        user: payload
      };
      case FACULTY_LOADED:
          return{
              ...state,
              isAuthenticated : true ,
              loading : false,
              faculty : payload
          }
    // case ALL_USERS_LOADED:
    //   return {
    //     ...state,
    //     error: null,
    //     users: payload
    //   };
    case SET_AUTH_USER_LOADING:
      return {
        ...state,
        userLoading: true
      };
    case UNSET_AUTH_USER_LOADING:
      return {
        ...state,
        userLoading: false
      };
    case LOGIN_FAILED:
    case ACCOUNT_DELETED:
    case LOGOUT:
    case AUTH_ERROR:
    case REGISTER_FAILED:
    case REGISTER_COORDINATOR_FAILED:
      case REGISTER_FACULTY_FAILED:
    case REGISTER_UNDERGRADUATE_STUDENT_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        userLoading: false,
        isAuthenticated: false,
        user: null
      };
    case REGISTER_SUCCESS:
      case REGISTER_FACULTY_SUCCESS:
    case REGISTER_COORDINATOR_SUCCESS:
    case REGISTER_UNDERGRADUATE_STUDENT_SUCCESS:
    case PASSWORD_UPDATED:
    default:
      return state;
  }
}
