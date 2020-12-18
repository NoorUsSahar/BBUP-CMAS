import axios from 'axios';
import { setAlert } from './alert';
import {
  //faculty
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_CURRENT_PROFILE,
  GET_FACULTIES,
  GET_FACULTIES_FAIL,
  GET_CURRENT_FACULTY_FAIL,
  GET_CURRENT_FACULTY,


  COORDINATOR_PROFILE_LOADED,
  ADMIN_PROFILE_LOADED,
  COORDINATOR_PROFILES_LOADED,
  ADMIN_PROFILES_LOADED,
  SET_COORDINATOR_PROFILE_LOADING,
  SET_ADMIN_PROFILE_LOADING,
  COORDINATOR_PROFILE_ERROR,
  ADMIN_PROFILE_ERROR,
  CLEAR_COORDINATOR_PROFILE,
  CLEAR_ADMIN_PROFILE,
  UPDATE_ADMIN_PERSONAL_DETAILS,
  UPDATE_ADMIN_EDUCATION_DETAILS,
  UPDATE_ADMIN_EXPERIENCE_DETAILS,
  UPDATE_COORDINATOR_PERSONAL_DETAILS,
  UPDATE_COORDINATOR_EDUCATION_DETAILS,
  UPDATE_COORDINATOR_EXPERIENCE_DETAILS
} from './types';
import { loadUser } from './auth';

// // Get current Admin profile by id
// export const getCurrentAdminProfile = () => async dispatch => {
//   dispatch({
//     type: SET_ADMIN_PROFILE_LOADING
//   });
//   try {
//     const res = await axios.get(`/api/profile/${id}`);

//     dispatch({
//       type: ADMIN_PROFILE_LOADED,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: ADMIN_PROFILE_ERROR,
//       payload: { msg: err.reponse.statusText, status: err.response.status }
//     });
//   }
// };

// Get all Admins profile
export const getAllAdminsProfile = () => async dispatch => {
  dispatch({
    type: SET_ADMIN_PROFILE_LOADING
  });
  try {
    const res = await axios.get('/api/adminProfile/admin');
    dispatch({
      type: ADMIN_PROFILES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADMIN_PROFILE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Get current Coordinator profile by id
export const getCurrentCoordinatorProfile = id => async dispatch => {
  dispatch({
    type: SET_COORDINATOR_PROFILE_LOADING
  });
  try {
    const res = await axios.get(`/api/adminProfile/${id}`);

    dispatch({
      type: COORDINATOR_PROFILE_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COORDINATOR_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all Coordinators profile
export const getAllCoordinatorsProfile = () => async dispatch => {
  dispatch({
    type: SET_COORDINATOR_PROFILE_LOADING
  });
  try {
    const res = await axios.get('/api/adminProfile/coordinator');
    dispatch({
      type: COORDINATOR_PROFILE_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COORDINATOR_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Admin personal details
export const updateAdminPersonalDetails = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      '/api/adminProfile/personal-details',
      formData,
      config
    );

    dispatch({
      type: UPDATE_ADMIN_PERSONAL_DETAILS,
      payload: res.data
    });

    dispatch(setAlert('Personal details have been successfully updated'));

    history.push('/admin/experience-details');
  } catch (err) {
    dispatch({
      type: ADMIN_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Admin experience details
export const updateAdminExperienceDetails = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      '/api/adminProfile/experience-details',
      formData,
      config
    );

    dispatch({
      type: UPDATE_ADMIN_EXPERIENCE_DETAILS,
      payload: res.data
    });

    dispatch(setAlert('Experience details have been successfully updated'));

    history.push('/admin/education-details');
  } catch (err) {
    dispatch({
      type: ADMIN_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Admin education details
export const updateAdminEducationDetails = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      '/api/adminProfile/education-details',
      formData,
      config
    );

    dispatch({
      type: UPDATE_ADMIN_EDUCATION_DETAILS,
      payload: res.data
    });

    dispatch(setAlert('Education details have been successfully updated'));
  } catch (err) {
    dispatch({
      type: ADMIN_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


//FACULTY PROFILES
//get current faculty's profile

export const getCurrentFaculty = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/adminProfile/me", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      },
    });
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};


export const getCurrentFacultyAccountById = faculty_id => async (dispatch) => {
  try {
    const res = await axios.get(`/api/adminProfile/faculty-account/${faculty_id}`);
    dispatch({
      type: GET_CURRENT_FACULTY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_FACULTY_FAIL,
      payload: { msg: err.message, status: err.status },
    });
  }
};


//get All profiles
export const getFaculties = () => async (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/adminProfile", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      },
    });
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};


//get All faculties
export const getAllFaculties = () => async (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/adminFaculty", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      },
    });
    dispatch({
      type: GET_FACULTIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FACULTIES_FAIL,
      payload: { msg: err.message, status: err.status },
    });
  }
};


//get Profile by id
export const getFacultyById = facultyId => async (dispatch) => {
  try {
    const res = await axios.get(`/api/adminProfile/faculty/${facultyId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//Create or update a profile
//history will push to client side route
//TODDO : create update profile separate (take out edit parameter)
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.post("/api/adminProfile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    //redirecting an action so using history to redirect component we use <Redirect/> instead
    // if(!edit){
    //   history.push('/dashboard');
    // }
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;

    if (errors) {
      const err = errors.data.errors;
      // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
      dispatch(setAlert("Invalid Credentials", "danger"));
    } else if (err.request) {
      dispatch(setAlert("err.msg", "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Reasearch Papers
export const addResearchPapers = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.put(
      "/api/adminProfile/research_papers",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Research Paper Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;

    //  if(errors){
    //      const err = errors.data.errors;
    //    // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
    //     dispatch(setAlert(err.msg , 'danger'));
    //  }
    //  else if(err.request){

    //      dispatch(setAlert(err.msg , 'danger'));
    //  }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: errors.statusText, status: errors.status },
    });
  }
};

//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.put("/api/adminProfile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;

    if (errors) {
      const err = errors.data.errors;
      // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
      dispatch(setAlert(err.msg, "danger"));
    } else if (err.request) {
      dispatch(setAlert(err.msg, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    };

    const res = await axios.put("/api/adminProfile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;

    if (errors) {
      const err = errors.data.errors;
      // err.forEach(error => dispatch(setAlert(error.msg , 'danger')))
      dispatch(setAlert(err.msg, "danger"));
    } else if (err.request) {
      dispatch(setAlert(err.msg, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete research_paper
export const deleteResearchPaper = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/adminProfile/research_paper/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Research Paper Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/adminProfile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

//Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/adminProfile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
//Delete Account and Profile
export const deleteAccount = (id) => async (dispatch) => {
  // if (window.confirm("Are you sure")) {
    try {
      await axios.delete(`/api/adminProfile/${id}`);

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch(setAlert("Account deleted Permanently"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.message, status: err.status },
      });
    }
  // }
  // else{
  //   dispatch(setAlert("Account not deleted"));
  // }
};
