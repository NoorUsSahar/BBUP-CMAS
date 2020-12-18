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
} from '../../actions/adminEtc/types';

const initialState = {
  semesters: [],
  semester: null,
  error: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_ENROLLMENT_SEMESTERS_LOADED:
      return {
        ...state,
        errors: null,
        loading: false,
        semesters: payload
      };
    case ENROLLMENT_SEMESTER_LOADED:
    case CURRENT_SEMESTER_LOADED:
      return {
        ...state,
        errors: null,
        loading: false,
        semester: payload
      };
    case ENROLLMENT_SEMESTER_ENABLED:
      return {
        ...state,
        errors: null,
        loading: false,
        semesters: [
          ...state.semesters.map(semester => {
            if (semester._id === payload._id) {
              semester.status = payload.status;
            }
            return semester;
          })
        ]
      };
    case ENROLLMENT_SEMESTER_DISABLED:
      return {
        ...state,
        errors: null,
        loading: false,
        semesters: [
          ...state.semesters.map(semester => {
            if (semester._id === payload._id) {
              semester.status = payload.status;
            }
            return semester;
          })
        ]
      };
    case ENROLLMENT_SEMESTER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case ENROLLMENT_SEMESTER_LOADING:
      return {
        ...state,
        loading: true
      };
    case ENROLLMENT_SEMESTER_CREATED:
    case ENROLLMENT_SEMESTER_UPDATED:
    case ENROLLMENT_SEMESTER_REMOVED:
    case GENERATE_ENROLLMENT_COURSE_LIST:
    case GENERATE_ENROLLMENT_SECTION_LIST:
    case GET_COURSE_LIST:
    case GET_SECTION_LIST:
    default:
      return state;
  }
}
