import {
  APPLICANT_LOADED,
  APPLICANT_ERROR,
  APPLICANT_PROGRAM_APPLIED,
  APPLICANT_PROGRAM_REMOVED,
  APPLICANT_COURSE_REGISTERED,
  APPLICANT_COURSE_REMOVED,
  APPLICANT_FORWARDED,
  APPLICANT_FORWARDED_LOADED,
  SET_APPLICANT_LOADING,
  APPLICANT_TEST_SCORE_ADDED,
  APPLICANT_ADMISSION_FEE_PICTURE_ADDED,
  UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICATION_FORWARDED,
  UNDERGRADUATE_AGGREGATE_CALCULATED,
  ALL_UNDERGRADUATE_APPLICANT_LOADED,
  UNDERGRADUATE_APPLICANT_VERIFIED,
  UNDERGRADUATE_APPLICANT_PENDING,
  UNDERGRADUATE_APPLICANT_DISCARDED,
  UNDERGRADUATE_APPLICANT_ACQUIRED,
  GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
  GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
  GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
  GRADUATE_APPLICANT_NTS_MARKS_UPDATED,
  GRADUATE_APPLICANT_VERIFIED,
  GRADUATE_APPLICANT_PENDING,
  GRADUATE_APPLICANT_DISCARDED,
  GRADUATE_APPLICANT_ACQUIRED,
  ALL_GRADUATE_APPLICANT_LOADED,
  GET_MERIT_LIST
} from './types';
import axios from 'axios';
import { getCurrentSession } from './admission';
import { setAlert } from './alert';

// Get current applicant
export const getCurrentApplicant = () => async dispatch => {
  try {
    const res = await axios.get('/api/applicants/me');

    dispatch({
      type: APPLICANT_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get applicant by id
export const getApplicantById = id => async dispatch => {
  dispatch({
    type: SET_APPLICANT_LOADING
  });
  try {
    const res = await axios.get(`/api/applicants/${id}`);

    dispatch({
      type: APPLICANT_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Check merit status
export const checkMeritStatus = () => async dispatch => {
  try {
    const res = await axios.get('/api/applicants/get-merit-status');

    dispatch({
      type: GET_MERIT_LIST
    });

    console.log(res.data.isOnMerit);

    return res.data.isOnMerit;
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get applicants forwarded applications
export const getApplicationForwardedApplicants = () => async dispatch => {
  try {
    const res = await axios.get('/api/applicants/application-forwarded');

    dispatch({
      type: APPLICANT_FORWARDED_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all undergraduate applicants
export const getAllUndergraduateApplicants = () => async dispatch => {
  try {
    const res = await axios.get('/api/applicants');

    dispatch({
      type: ALL_UNDERGRADUATE_APPLICANT_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all undergraduate students
export const getAllUndergraduateStudents = () => async dispatch => {
  try {
    const res = await axios.get('/api/applicants/students');

    dispatch({
      type: ALL_UNDERGRADUATE_APPLICANT_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update undergraduate applicant personal details
export const updatePersonalDetails = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      '/api/applicants/personal-details',
      formData,
      config
    );

    dispatch({
      type: UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
      payload: res.data
    });

    history.push('/applicant/income-details');
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('All fields are required'));
  }
};

// Update undergraduate applicant income details
export const updateIncomeDetails = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      '/api/applicants/income-details',
      formData,
      config
    );

    dispatch({
      type: UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
      payload: res.data
    });

    history.push('/applicant/education-details');
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('All fields are required'));
  }
};

// Update undergraduate applicant education details
export const updateEducationDetails = formData => async dispatch => {
  if (
    window.confirm(
      'After submission you will not be able to make any changes, do you want to continue?'
    )
  ) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        '/api/applicants/education-details',
        formData,
        config
      );

      dispatch({
        type: UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
        payload: res.data
      });

      return true;
    } catch (err) {
      dispatch({
        type: APPLICANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });

      dispatch(setAlert('All fields are required'));
    }
  }

  return false;
};

// Update graduate applicant personal details
export const updateGraduatePersonalDetails = (
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
      '/api/applicants/personal-details',
      formData,
      config
    );

    dispatch({
      type: GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
      payload: res.data
    });

    history.push('/applicant/income-details');
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('All fields are required'));
  }
};

// Update graduate applicant income details
export const updateGraduateIncomeDetails = (
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
      '/api/applicants/income-details',
      formData,
      config
    );

    dispatch({
      type: GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
      payload: res.data
    });

    history.push('/applicant/education-details');
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('All fields are required'));
  }
};

// Update graduate applicant education details
export const updateGraduateEducationDetails = (
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
      '/api/applicants/education-details',
      formData,
      config
    );

    dispatch({
      type: GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
      payload: res.data
    });

    history.push('/applicant/nts-details');
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('All fields are required'));
  }
};

// Update graduate applicant nts marks details
export const updateGraduateNTSDetails = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put('/api/applicants/ntsMarks', formData, config);

    dispatch({
      type: GRADUATE_APPLICANT_NTS_MARKS_UPDATED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('All fields are required'));
  }
};

// Update fee details
export const updateFeeDetails = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      '/api/applicants/submitted-fee-challan',
      formData,
      config
    );

    dispatch({
      type: APPLICANT_ADMISSION_FEE_PICTURE_ADDED,
      payload: res.data
    });

    dispatch(setAlert('Fee details have been updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Apply for program
export const applyProgram = id => async dispatch => {
  try {
    const res = await axios.put(`/api/applicants/apply/${id}`);

    dispatch({
      type: APPLICANT_PROGRAM_APPLIED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove for program
export const removeProgram = id => async dispatch => {
  try {
    const res = await axios.put(`/api/applicants/remove/${id}`);

    dispatch({
      type: APPLICANT_PROGRAM_REMOVED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Register for course
export const registeCourse = (id, applicantId) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/applicants/register/${id}/${applicantId}`
    );

    dispatch({
      type: APPLICANT_COURSE_REGISTERED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove for course
export const removeCourse = (id, applicantId) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/applicants/remove/course/${id}/${applicantId}`
    );

    dispatch({
      type: APPLICANT_COURSE_REMOVED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Applicant forwarded
export const applicantForwarded = () => async dispatch => {
  try {
    await axios.put('/api/applicants/forwarded');

    dispatch({
      type: APPLICANT_FORWARDED
    });

    dispatch(setAlert('Applicant has been forwaded'));
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Applicant Verified
export const applicantVerified = id => async dispatch => {
  dispatch({
    type: SET_APPLICANT_LOADING
  });
  try {
    const res = await axios.put(`/api/applicants/verify/${id}`);

    dispatch({
      type: UNDERGRADUATE_APPLICANT_VERIFIED,
      payload: res.data
    });

    dispatch(setAlert('Applicant has been verified'));
    dispatch(getCurrentSession());
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Applicant Pending
export const applicantPending = id => async dispatch => {
  dispatch({
    type: SET_APPLICANT_LOADING
  });
  try {
    const res = await axios.put(`/api/applicants/pending/${id}`);

    dispatch({
      type: UNDERGRADUATE_APPLICANT_PENDING,
      payload: res.data
    });

    dispatch(setAlert('Applicant is pending'));
    dispatch(getCurrentSession());
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Applicant Discarded
export const applicantDiscarded = id => async dispatch => {
  dispatch({
    type: SET_APPLICANT_LOADING
  });
  try {
    const res = await axios.put(`/api/applicants/discarded/${id}`);

    dispatch({
      type: UNDERGRADUATE_APPLICANT_DISCARDED,
      payload: res.data
    });

    dispatch(setAlert('Applicant has been discarded'));
    dispatch(getCurrentSession());
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Applicant Acquired
export const applicantAcquired = id => async dispatch => {
  dispatch({
    type: SET_APPLICANT_LOADING
  });
  try {
    const res = await axios.put(`/api/applicants/acquire/${id}`);

    dispatch({
      type: UNDERGRADUATE_APPLICANT_ACQUIRED,
      payload: res.data
    });

    dispatch(setAlert('Applicant has been moved to merit list again'));
    dispatch(getCurrentSession());
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Applicant Test Score Added
export const testScoreAdded = (id, universityTestScore) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ universityTestScore });

  try {
    const res = await axios.put(
      `/api/applicants/update-test-score/${id}`,
      body,
      config
    );

    dispatch({
      type: APPLICANT_TEST_SCORE_ADDED,
      payload: res.data
    });

    dispatch(setAlert('Test score is added successfully'));
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Applicant Aggregate Calculated
export const calculateAggregate = id => async dispatch => {
  try {
    const res = await axios.put(`/api/applicants/calculate-aggregate/${id}`);

    dispatch({
      type: UNDERGRADUATE_AGGREGATE_CALCULATED,
      payload: res.data
    });

    dispatch(setAlert('Aggregate has been calculated'));
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Undergraduate Application forwarded
export const applicationForwarded = id => async dispatch => {
  try {
    const res = await axios.put(`/api/applicants/forwarded/${id}`);

    dispatch({
      type: UNDERGRADUATE_APPLICATION_FORWARDED,
      payload: res.data
    });

    dispatch(setAlert('Application has been forwaded'));
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
