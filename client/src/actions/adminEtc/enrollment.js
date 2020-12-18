import {
  CURRENT_SEMESTER_LOADED,
  ALL_ENROLLMENT_SEMESTERS_LOADED,
  ENROLLMENT_SEMESTER_CREATED,
  ENROLLMENT_SEMESTER_UPDATED,
  ENROLLMENT_SEMESTER_ERROR,
  ENROLLMENT_SEMESTER_ENABLED,
  ENROLLMENT_SEMESTER_DISABLED,
  ENROLLMENT_SEMESTER_LOADING,
  ENROLLMENT_SEMESTER_LOADED,
  ENROLLMENT_SEMESTER_REMOVED,
  GET_COURSE_LIST,
  GENERATE_ENROLLMENT_COURSE_LIST,
  GET_SECTION_LIST,
  GENERATE_ENROLLMENT_SECTION_LIST
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all enrollment semesters
export const getAllEnrollmentSemesters = () => async dispatch => {
  try {
    const res = await axios.get('/api/enrollments');

    dispatch({
      type: ALL_ENROLLMENT_SEMESTERS_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ENROLLMENT_SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get current semester
export const getCurrentEnrollmentSemester = id => async dispatch => {
  try {
    const res = await axios.get(`/api/enrollments/current/${id}`);

    dispatch({
      type: CURRENT_SEMESTER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ENROLLMENT_SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get semester by id
export const getEnrollmentSemesterById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/enrollments/${id}`);

    dispatch({
      type: ENROLLMENT_SEMESTER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ENROLLMENT_SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create course list
export const generateCourseList = id => async dispatch => {
  try {
    await axios.put(`/api/enrollments/generate-course-list/${id}`);

    dispatch({
      type: GENERATE_ENROLLMENT_COURSE_LIST
    });

    dispatch(setAlert('Course list generated successfully'));
  } catch (err) {
    dispatch({
      type: ENROLLMENT_SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create section list
export const generateSectionList = id => async dispatch => {
  try {
    await axios.put(`/api/enrollments/generate-section-list/${id}`);

    dispatch({
      type: GENERATE_ENROLLMENT_SECTION_LIST
    });

    dispatch(setAlert('Section list generated successfully'));
  } catch (err) {
    dispatch({
      type: ENROLLMENT_SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create enrollment semester
export const createEnrollmentSemester = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/enrollments', formData, config);

    dispatch({
      type: ENROLLMENT_SEMESTER_CREATED,
      payload: res.data
    });

    dispatch(setAlert('Enrollment created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ENROLLMENT_SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update enrollment semester by id
export const updateEnrollmentSemesterById = (
  id,
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(`/api/enrollments/${id}`, formData, config);

    dispatch({
      type: ENROLLMENT_SEMESTER_UPDATED,
      payload: res.data
    });

    dispatch(setAlert('Enrollment semester updated successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ENROLLMENT_SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Enable enrollment semester by id
export const enableEnrollmentSemesterById = (id, history) => async dispatch => {
  dispatch({
    type: ENROLLMENT_SEMESTER_LOADING
  });
  try {
    const res = await axios.put(
      `/api/enrollments/enable-enrollment-semester/${id}`
    );

    dispatch({
      type: ENROLLMENT_SEMESTER_ENABLED,
      payload: res.data
    });

    dispatch(setAlert('Enrollment semester enabled'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ENROLLMENT_SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Disable enrollment semester by id
export const disableEnrollmentSemesterById = (
  id,
  history
) => async dispatch => {
  dispatch({
    type: ENROLLMENT_SEMESTER_LOADING
  });
  try {
    const res = await axios.put(
      `/api/enrollments/disable-enrollment-semester/${id}`
    );

    dispatch({
      type: ENROLLMENT_SEMESTER_DISABLED,
      payload: res.data
    });

    dispatch(setAlert('Enrollment semester disabled'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ENROLLMENT_SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove enrollment semester by id
export const removeEnrollmentSemesterById = id => async dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete this session? Once deleted it can not be undone?'
    )
  ) {
    try {
      await axios.delete(`/api/enrollments/remove-enrollment-semester/${id}`);

      dispatch({
        type: ENROLLMENT_SEMESTER_REMOVED
      });

      dispatch(setAlert('Enrollment semester removed successfully'));
    } catch (err) {
      dispatch({
        type: ENROLLMENT_SEMESTER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
