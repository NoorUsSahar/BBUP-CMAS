import {
    GET_FACULTIES_FAIL,
    GET_FACULTIES
  } from "../../actions/adminEtc/types";
  
  const initialState = {
    faculties : null,
    // repos : [] ,
    loading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_FACULTIES:
       
        return {
          ...state,
          profile: payload,
          loading: false,
        };
      case GET_FACULTIES_FAIL:
        return {
          ...state,
          error: payload,
          loading: false,
        };
  
      default:
        return state;
    }
  }
  