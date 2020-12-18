import {
    EMAIL_FAIL,
    EMAIL_SENT
  } from './types';
  import axios from 'axios';
  import { setAlert } from './alert';
  
  export const sendEmailAdmin = (formData) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const res = await axios.put('/api/chatbot/send-email-admin', formData, config);
  
      dispatch({
        type: EMAIL_SENT,
        payload: res.data.token,
      });
  
      dispatch(setAlert('Email Sent Successfully'));
    } catch (err) {
      dispatch({ type: EMAIL_FAIL });
  
      if (err.response.status === 400) {
        dispatch(setAlert('Email Not Sent . TRY AGAIN'));
      }
    }
  };