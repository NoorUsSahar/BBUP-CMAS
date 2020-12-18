import {
  CURRENT_ANNOUNCEMENT_FEED_LOADED,
  ALL_ANNOUNCEMENT_FEEDS_LOADED,
  ANNOUNCEMENT_FEED_LOADING,
  ANNOUNCEMENT_FEED_LOADED,
  ANNOUNCEMENT_FEED_CREATED,
  ANNOUNCEMENT_FEED_ENABLED,
  ANNOUNCEMENT_FEED_DISABLED,
  ANNOUNCEMENT_FEED_REMOVED,
  ANNOUNCEMENT_FEED_UPDATED,
  ANNOUNCEMENT_FEED_ERROR
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all announcement feeds
export const getAllAnnouncementFeeds = () => async dispatch => {
  try {
    const res = await axios.get('/api/announcements');

    dispatch({
      type: ALL_ANNOUNCEMENT_FEEDS_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_FEED_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Get current announcement feed
export const getCurrentAnnouncementFeed = () => async dispatch => {
  try {
    const res = await axios.get('/api/announcements/current');

    dispatch({
      type: CURRENT_ANNOUNCEMENT_FEED_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_FEED_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Get announcement feed by id
export const getAnnouncementFeedById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/announcements/${id}`);

    dispatch({
      type: ANNOUNCEMENT_FEED_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_FEED_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Create an announcement feed as Admin
export const createAdminAnnouncementFeed = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/announcements/admin', formData, config);

    dispatch({
      type: ANNOUNCEMENT_FEED_CREATED,
      payload: res.data
    });

    dispatch(setAlert('Announcement feed successfully created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_FEED_ERROR,
      payload: { msg: err.message, status: err.message.status }
    });
  }
};

// Create an announcement feed as Coordinator
export const createCoordinatorAnnouncementFeed = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      '/api/announcements/coordinator',
      formData,
      config
    );

    dispatch({
      type: ANNOUNCEMENT_FEED_CREATED,
      payload: res.data
    });

    dispatch(setAlert('Announcement feed successfully created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_FEED_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Update Admin announcement feed by id
export const updateAdminAnnouncementFeed = (
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
    const res = await axios.put(
      `/api/announcements/update-admin-announcement-feed/${id}`,
      formData,
      config
    );

    dispatch({
      type: ANNOUNCEMENT_FEED_UPDATED,
      payload: res.data
    });

    dispatch(setAlert('Announcement has been successfully updated'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_FEED_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Update Coordinator announcement feed by id
export const updateCoordinatorAnnouncementFeed = (
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
    const res = await axios.put(
      `/api/announcements/update-coordinator-announcement-feed/${id}`,
      formData,
      config
    );

    dispatch({
      type: ANNOUNCEMENT_FEED_UPDATED,
      payload: res.data
    });

    dispatch(setAlert('Announcement has been successfully updated'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_FEED_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Enable Announcement feed by id
export const announcementFeedEnabled = (id, history) => async dispatch => {
  dispatch({
    type: ANNOUNCEMENT_FEED_LOADING
  });
  try {
    const res = await axios.put(
      `/api/announcements/enable-announcement-feed/${id}`
    );

    dispatch({
      type: ANNOUNCEMENT_FEED_ENABLED,
      payload: res.data
    });

    dispatch(setAlert('Announcement feed enabled successfully'));

    dispatch(getAllAnnouncementFeeds());

    history.goBack();
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_FEED_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Disable Announcement feed by id
export const announcementFeedDisabled = (id, history) => async dispatch => {
  dispatch({
    type: ANNOUNCEMENT_FEED_LOADING
  });
  try {
    const res = await axios.put(
      `/api/announcements/disable-announcement-feed/${id}`
    );

    dispatch({
      type: ANNOUNCEMENT_FEED_DISABLED,
      payload: res.data
    });

    dispatch(setAlert('Announcement feed disabled successfully'));
    dispatch(getAllAnnouncementFeeds());

    history.goBack();
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_FEED_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Remove Announcement feed by id
export const removeAnnouncementFeed = (id, history) => async dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete this announcement? Once deleted it can not be undone?'
    )
  )
    try {
      await axios.delete(`/api/announcements/remove-announcement-feed/${id}`);

      dispatch({
        type: ANNOUNCEMENT_FEED_REMOVED
      });

      dispatch(setAlert('Announcement feed removed successfully'));
      history.goBack();
    } catch (err) {
      dispatch({
        type: ANNOUNCEMENT_FEED_ERROR,
        payload: { msg: err.message.statusText, status: err.message.status }
      });
    }
};
