import {
  ALL_SECTIONS_LOADED,
  SECTION_ERROR,
  SECTION_CREATED,
  SECTION_LOADED,
  SECTION_UPDATED,
  SECTION_REMOVED
} from '../../actions/adminEtc/types';

const initialState = {
  sections: [],
  section: null,
  errors: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_SECTIONS_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        sections: payload
      };
    case SECTION_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        section: payload
      };
    case SECTION_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case SECTION_CREATED:
    case SECTION_UPDATED:
    case SECTION_REMOVED:
    default:
      return state;
  }
}
