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
} from '../../actions/adminEtc/types';

const initialState = {
  course: null,
  undergraduateCourses: [],
  graduateCourses: [],
  loading: null,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_UNDERGRADUATE_COURSES_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        undergraduateCourses: payload
      };
    case ALL_GRADUATE_COURSES_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        graduateCourses: payload
      };
    case COURSE_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        course: payload
      };
    case COURSE_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case SECTION_UNDERGRADUATE_COURSES_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        undergraduateCourses: payload
      };
    case SECTION_GRADUATE_COURSES_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        graduateCourses: payload
      };
    case SET_UNDERGRADUATE_COURSE_LOADING:
    case SET_GRADUATE_COURSE_LOADING:
      return {
        ...state,
        loading: true
      };
    case UNDERGRADUATE_COURSE_ENABLED:
      return {
        ...state,
        loading: false,
        error: null,
        undergraduateCourses: [
          ...state.undergraduateCourses.map(undergraduateCourse => {
            if (undergraduateCourse._id === payload._id) {
              undergraduateCourse.isOffered = payload.isOffered;
            }
            return undergraduateCourse;
          })
        ]
      };
    case UNDERGRADUATE_COURSE_DISABLED:
      return {
        ...state,
        loading: false,
        error: null,
        undergraduateCourses: [
          ...state.undergraduateCourses.map(undergraduateCourse => {
            if (undergraduateCourse._id === payload._id) {
              undergraduateCourse.isOffered = payload.isOffered;
            }
            return undergraduateCourse;
          })
        ]
      };
    case GRADUATE_COURSE_ENABLED:
      return {
        ...state,
        loading: false,
        error: null,
        graduateCourses: [
          ...state.graduateCourses.map(graduateCourse => {
            if (graduateCourse._id === payload._id) {
              graduateCourse.isOffered = payload.isOffered;
            }
            return graduateCourse;
          })
        ]
      };
    case GRADUATE_COURSE_DISABLED:
      return {
        ...state,
        loading: false,
        error: null,
        graduateCourses: [
          ...state.graduateCourses.map(graduateCourse => {
            if (graduateCourse._id === payload._id) {
              graduateCourse.isOffered = payload.isOffered;
            }
            return graduateCourse;
          })
        ]
      };
    case PROGRAM_UNDERGRADUATE_COURSES_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        undergraduateCourses: payload
      };
    case PROGRAM_GRADUATE_COURSES_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        graduateCourses: payload
      };
    case ALL_UNDERGRADUATE_COURSES_DISABLED:
    case ALL_GRADUATE_COURSES_DISABLED:
    case UNDERGRADUATE_COURSE_MAJOR_CREATED:
    case UNDERGRADUATE_COURSE_MINOR_CREATED:
    case UNDERGRADUATE_COURSE_UPDATED:
    case GRADUATE_COURSE_MAJOR_CREATED:
    case GRADUATE_COURSE_MINOR_CREATED:
    case GRADUATE_COURSE_UPDATED:
    case REMOVE_COURSE:
    default:
      return state;
  }
}
