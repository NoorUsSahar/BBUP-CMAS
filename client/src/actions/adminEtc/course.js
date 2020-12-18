import {
  COURSE_LOADED,
  COURSE_ERROR,
  REMOVE_COURSE,
  ALL_UNDERGRADUATE_COURSES_LOADED,
  UNDERGRADUATE_COURSE_MAJOR_CREATED,
  UNDERGRADUATE_COURSE_MINOR_CREATED,
  UNDERGRADUATE_COURSE_UPDATED,
  SET_UNDERGRADUATE_COURSE_LOADING,
  UNDERGRADUATE_COURSE_ENABLED,
  UNDERGRADUATE_COURSE_DISABLED,
  ALL_UNDERGRADUATE_COURSES_DISABLED,
  PROGRAM_UNDERGRADUATE_COURSES_LOADED,
  ALL_GRADUATE_COURSES_LOADED,
  GRADUATE_COURSE_MAJOR_CREATED,
  GRADUATE_COURSE_MINOR_CREATED,
  GRADUATE_COURSE_UPDATED,
  SET_GRADUATE_COURSE_LOADING,
  GRADUATE_COURSE_ENABLED,
  GRADUATE_COURSE_DISABLED,
  ALL_GRADUATE_COURSES_DISABLED,
  PROGRAM_GRADUATE_COURSES_LOADED,
  SECTION_UNDERGRADUATE_COURSES_LOADED,
  SECTION_GRADUATE_COURSES_LOADED
} from './/types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all undergraduate courses
export const getAllUndergraduateCourses = () => async dispatch => {
  try {
    const res = await axios.get('/api/courses/undergraduate-courses');

    dispatch({
      type: ALL_UNDERGRADUATE_COURSES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Get all graduate courses
export const getAllGraduateCourses = () => async dispatch => {
  try {
    const res = await axios.get('/api/courses/graduate-courses');

    dispatch({
      type: ALL_GRADUATE_COURSES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Get all undergraduate courses of a section
export const getSectionsAllUndergraduateCourses = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/courses/undergraduate-courses/section/${id}`
    );

    dispatch({
      type: SECTION_UNDERGRADUATE_COURSES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all graduate courses of a section
export const getSectionsAllGraduateCourses = id => async dispatch => {
  try {
    const res = await axios.get(`/api/courses/graduate-courses/section/${id}`);

    dispatch({
      type: SECTION_GRADUATE_COURSES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all undergraduate courses of a program in a department
export const getProgramAllUndergraduateCourses = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/courses/undergraduate-courses/program/${id}`
    );

    dispatch({
      type: PROGRAM_UNDERGRADUATE_COURSES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Get all graduate courses of a program in a department
export const getProgramAllGraduateCourses = id => async dispatch => {
  try {
    const res = await axios.get(`/api/courses/graduate-courses/program/${id}`);

    dispatch({
      type: PROGRAM_GRADUATE_COURSES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Create undergraduate major course
export const createUndergraduateMajorCourse = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    await axios.post(
      '/api/courses/undergraduate-course/major',
      formData,
      config
    );

    dispatch({
      type: UNDERGRADUATE_COURSE_MAJOR_CREATED
    });

    dispatch(setAlert('Undergraduate major course created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });

    dispatch(setAlert('Error occured while creating Course'));
  }
};

// Create undergraduate minor course
export const createUndergraduateMinorCourse = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    await axios.post(
      '/api/courses/undergraduate-course/minor',
      formData,
      config
    );

    dispatch({
      type: UNDERGRADUATE_COURSE_MINOR_CREATED
    });

    dispatch(setAlert('Undergraduate minor course created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
    dispatch(setAlert('Error occured while creating Course'));
  }
};

// Create graduate major course
export const createGraduateMajorCourse = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    await axios.post('/api/courses/graduate-course/major', formData, config);

    dispatch({
      type: GRADUATE_COURSE_MAJOR_CREATED
    });

    dispatch(setAlert('Graduate major course created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
    dispatch(setAlert('Error occured while creating Course'));
  }
};

// Create graduate minor course
export const createGraduateMinorCourse = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    await axios.post('/api/courses/graduate-course/minor', formData, config);

    dispatch({
      type: GRADUATE_COURSE_MINOR_CREATED
    });

    dispatch(setAlert('Graduate minor course created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
    dispatch(setAlert('Error occured while creating Course'));
  }
};

// Update an undergraduate course
export const updateUndergraduateCourse = (
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
    await axios.put(
      `/api/courses/undergraduate-course/${id}`,
      formData,
      config
    );

    dispatch({
      type: UNDERGRADUATE_COURSE_UPDATED
    });

    dispatch(setAlert('Course updated successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
    dispatch(setAlert('Error occured while updating Course'));
  }
};

// Update an graduate course
export const updateGraduateCourse = (
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
    await axios.put(`/api/courses/gaduate-course/${id}`, formData, config);

    dispatch({
      type: GRADUATE_COURSE_UPDATED
    });

    dispatch(setAlert('Course updated successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
    dispatch(setAlert('Error occured while updating Course'));
  }
};

// Get course by id
export const getCourseById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/courses/${id}`);

    dispatch({
      type: COURSE_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
    dispatch(setAlert('Error occured while updating Course'));
  }
};

// Remove a course by id
export const removeCourseById = (id, history) => async dispatch => {
  if (window.confirm('Are you sure you want to remove course!'))
    try {
      await axios.delete(`/api/courses/${id}`);

      dispatch({
        type: REMOVE_COURSE
      });

      dispatch(setAlert('Course has been removed successfully'));

      history.goBack();
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
      dispatch(setAlert('Error occured while removing Course'));
    }
};

// Enable an undergraduate course by id
export const enableUndergraduateCourse = (id, history) => async dispatch => {
  dispatch({
    type: SET_UNDERGRADUATE_COURSE_LOADING
  });
  try {
    const res = await axios.put(`/api/courses/enable/${id}`);

    dispatch({
      type: UNDERGRADUATE_COURSE_ENABLED,
      payload: res.data
    });

    dispatch(setAlert('Undergraduate course was successfully enabled'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
    dispatch(setAlert('Error occured while enabling Course'));
  }
};

// Disable an undergraduate course by id
export const disableUndergraduateCourse = (id, history) => async dispatch => {
  dispatch({
    type: SET_UNDERGRADUATE_COURSE_LOADING
  });
  try {
    const res = await axios.put(`/api/courses/disable/${id}`);

    dispatch({
      type: UNDERGRADUATE_COURSE_DISABLED,
      payload: res.data
    });

    dispatch(setAlert('Undergraduate course was successfully disabled'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
    dispatch(setAlert('Error occured while disabling Course'));
  }
};

// Enable a graduate course by id
export const enableGraduateCourse = (id, history) => async dispatch => {
  dispatch({
    type: SET_GRADUATE_COURSE_LOADING
  });
  try {
    const res = await axios.put(`/api/courses/enable/${id}`);

    dispatch({
      type: GRADUATE_COURSE_ENABLED,
      payload: res.data
    });

    dispatch(setAlert('Graduate course was successfully enabled'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Disable a graduate course by id
export const disableGraduateCourse = (id, history) => async dispatch => {
  dispatch({
    type: SET_GRADUATE_COURSE_LOADING
  });
  try {
    const res = await axios.put(`/api/courses/disable/${id}`);

    dispatch({
      type: GRADUATE_COURSE_DISABLED,
      payload: res.data
    });

    dispatch(setAlert('Graduate course was successfully disabled'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Disable all undergraduate courses
export const disableAllUndergraduateCourses = history => async dispatch => {
  dispatch({
    type: SET_UNDERGRADUATE_COURSE_LOADING
  });
  try {
    const res = await axios.put('/api/courses/undergraduate-disable/all');

    dispatch({
      type: ALL_UNDERGRADUATE_COURSES_DISABLED,
      payload: res.data
    });

    dispatch(setAlert('All undergraduate courses are disabled'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Disable all graduate courses
export const disableAllGraduateCourses = history => async dispatch => {
  dispatch({
    type: SET_GRADUATE_COURSE_LOADING
  });
  try {
    const res = await axios.put('/api/courses/graduate-disable/all');

    dispatch({
      type: ALL_GRADUATE_COURSES_DISABLED,
      payload: res.data
    });

    dispatch(setAlert('All graduate courses are disabled'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};
