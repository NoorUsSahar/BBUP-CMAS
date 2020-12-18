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
  ALL_UNDERGRADUATE_APPLICANT_LOADED,
  UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
  UNDERGRADUATE_PROGRAM_APPLIED,
  UNDERGRADUATE_APPLICANT_VERIFIED,
  UNDERGRADUATE_APPLICANT_PENDING,
  UNDERGRADUATE_APPLICANT_DISCARDED,
  UNDERGRADUATE_APPLICANT_ACQUIRED,
  // UNDERGRADUATE_APPLICANT_APPLIED_PROGRAMS_LOADED,
  ALL_GRADUATE_APPLICANT_LOADED,
  GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
  GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
  GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
  GRADUATE_APPLICANT_NTS_MARKS_UPDATED,
  GRADUATE_PROGRAM_APPLIED,
  UNDERGRADUATE_AGGREGATE_CALCULATED,
  UNDERGRADUATE_APPLICATION_FORWARDED,
  GRADUATE_APPLICANT_VERIFIED,
  GRADUATE_APPLICANT_PENDING,
  GRADUATE_APPLICANT_DISCARDED,
  GRADUATE_APPLICANT_ACQUIRED
} from '../../actions/adminEtc/types';

const initialState = {
  applicant: null,
  undergraduateApplicants: [],
  graduateApplicants: [],
  loading: true,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case APPLICANT_LOADED:
    case APPLICANT_PROGRAM_APPLIED:
    case APPLICANT_PROGRAM_REMOVED:
    case APPLICANT_COURSE_REGISTERED:
    case APPLICANT_COURSE_REMOVED:
    case APPLICANT_FORWARDED_LOADED:
    case APPLICANT_TEST_SCORE_ADDED:
    case APPLICANT_ADMISSION_FEE_PICTURE_ADDED:
    case UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED:
    case GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED:
    case GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED:
    case GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED:
    case GRADUATE_APPLICANT_NTS_MARKS_UPDATED:
    case UNDERGRADUATE_AGGREGATE_CALCULATED:
    case UNDERGRADUATE_APPLICATION_FORWARDED:
      return {
        ...state,
        loading: false,
        errors: null,
        applicant: payload
      };
    // case UNDERGRADUATE_APPLICANT_APPLIED_PROGRAMS_LOADED:
    //   return {
    //     ...state,
    //     loading: false,
    //     errors: null,
    //     undergraduateApplicants: [
    //       ...state.undergraduateApplicants.map(applicant => {
    //         if (applicant.appliedPrograms.programme === payload.id) {

    //         }
    //       })
    //     ]
    //   };
    case ALL_UNDERGRADUATE_APPLICANT_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        undergraduateApplicants: payload
      };
    case ALL_GRADUATE_APPLICANT_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        graduateApplicants: payload
      };
    case APPLICANT_FORWARDED:
      return {
        ...state,
        loading: false,
        errors: null,
        applicant: { ...state.applicant, applicantForwarded: true }
      };
    // case APPLICANT_VERIFIED:
    //   return {
    //     ...state,
    //     loading: false,
    //     errors: null,
    //     applicant: { ...state.applicant, applicantVerified: true }
    //   };
    case APPLICANT_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case SET_APPLICANT_LOADING:
      return {
        ...state,
        loading: true
      };
    case UNDERGRADUATE_APPLICANT_VERIFIED:
    case UNDERGRADUATE_APPLICANT_PENDING:
    case UNDERGRADUATE_APPLICANT_DISCARDED:
    case UNDERGRADUATE_APPLICANT_ACQUIRED:
    default:
      return state;
  }
}
