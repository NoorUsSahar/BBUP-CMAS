import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_STUDENT_PROFILE,
  GET_STUDENT_PROFILES,
  STUDENT_PROFILE_ERROR,
  CLEAR_STUDENT_PROFILE,
  STUDENT_ACCOUNT_DELETED,
} from "./types";

//get current student's profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/studentprofile/me", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      },
    });
    dispatch({
      type: GET_STUDENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//get All profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_STUDENT_PROFILE });
  try {
    const res = await axios.get("/api/studentprofile", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      },
    });
    dispatch({
      type: GET_STUDENT_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//get Students Profile by id
export const getProfileById = userId=> async (dispatch) => {
  try {
    const res = await axios.get(`/api/studentprofile/user/${userId}`);
    dispatch({
      type: GET_STUDENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//Create or update a profile( add info)
//history will push to client side route
//TODDO : create update profile separate (take out edit parameter)
export const addInfo = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.post("/api/studentprofile/", formData , config);

    dispatch({
      type: GET_STUDENT_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Information Updated" : "Information Added", "success"));

    //redirecting an action so using history to redirect component we use <Redirect/> instead
    // if(!edit){
    //   history.push('/dashboard');
    // }
    history.push("/admin/dashboard");
  } catch (err) {
    const errors = err.response;

    if (errors) {
      const err = errors.data;
      // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
      dispatch(setAlert("Info not Added , Please Recheck your fields"));
      // dispatch(setAlert(" errors.data danger"));
    } else if (errors.request) {
      dispatch(setAlert("errr danger"));
    }

    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Account and Profile
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm("Are you sure")) {
    try {
      await axios.delete(1`/api/studentprofile/`);

      dispatch({
        type: CLEAR_STUDENT_PROFILE,
      });

      dispatch({
        type: STUDENT_ACCOUNT_DELETED,
      });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: STUDENT_PROFILE_ERROR,
        payload: { msg: err.message, status: err.status },
      });
    }
  }
};
