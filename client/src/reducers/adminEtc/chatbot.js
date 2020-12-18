import {
    EMAIL_SENT,
    EMAIL_FAIL
  } from '../../actions/adminEtc/types';
  
  const initialState = {
    send_status : null ,
    loading : true,
    errors: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case EMAIL_SENT:
     return {
         ...state , 
        loading : false,
        send_status: payload,
     }
      case EMAIL_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          loading: false,
         error:payload,
        };
     
      default:
        return state;
    }
  }
  