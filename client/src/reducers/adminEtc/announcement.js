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
} from '../../actions/adminEtc/types';

const initialState = {
  feeds: [],
  feed: null,
  errors: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_ANNOUNCEMENT_FEEDS_LOADED:
      return {
        ...state,
        errors: null,
        loading: false,
        feeds: payload
      };
    case ANNOUNCEMENT_FEED_LOADED:
    case CURRENT_ANNOUNCEMENT_FEED_LOADED:
      return {
        ...state,
        errors: null,
        loading: false,
        feed: payload
      };
    case ANNOUNCEMENT_FEED_LOADING:
      return {
        ...state,
        loading: true
      };
    case ANNOUNCEMENT_FEED_DISABLED:
      return {
        ...state,
        errors: null,
        loading: false,
        feeds: [
          ...state.feeds.map(feed => {
            if (feed._id === payload._id) {
              feed.status = payload.status;
            }
            return feed;
          })
        ]
      };
    case ANNOUNCEMENT_FEED_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case ANNOUNCEMENT_FEED_ENABLED:
      return {
        ...state,
        errors: null,
        loading: false,
        feeds: [
          ...state.feeds.map(feed => {
            if (feed._id === payload._id) {
              feed.status = payload.status;
            }
            return feed;
          })
        ]
      };
    case ANNOUNCEMENT_FEED_CREATED:
    case ANNOUNCEMENT_FEED_UPDATED:
    case ANNOUNCEMENT_FEED_REMOVED:
    default:
      return state;
  }
}
