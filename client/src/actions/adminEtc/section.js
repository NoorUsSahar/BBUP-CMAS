import {
  ALL_SECTIONS_LOADED,
  SECTION_ERROR,
  SECTION_CREATED,
  SECTION_LOADED,
  SECTION_UPDATED,
  SECTION_REMOVED
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all sections
export const getAllSections = () => async dispatch => {
  try {
    const res = await axios.get('/api/sections');

    dispatch({
      type: ALL_SECTIONS_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create a section
export const createSection = (formData, history) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const res = await axios.post('/api/sections', formData, config);

    dispatch({
      type: SECTION_CREATED,
      payload: res.data
    });

    dispatch(setAlert('Section created'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: SECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get department by id
export const getSectionById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/sections/${id}`);

    dispatch({
      type: SECTION_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update section by id
export const updateSectionById = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    await axios.put(`/api/sections/${id}`, formData, config);

    dispatch({
      type: SECTION_UPDATED
    });

    dispatch(setAlert('Section has been updated successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: SECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove a section by id
export const removeSection = (id, history) => async dispatch => {
  if (window.confirm('Are you sure you want to remove this section?'))
    try {
      await axios.delete(`/api/sections/${id}`);

      dispatch({
        type: SECTION_REMOVED
      });

      dispatch(getAllSections());

      dispatch(setAlert('Section has been removed successfully'));
      history.goBack();
    } catch (err) {
      dispatch(setAlert('Error occurred while removing section'));
    }
};
