import {
  GET_STUDENT_PROFILE,
  GET_STUDENT_PROFILES,
  STUDENT_PROFILE_ERROR,
  CLEAR_STUDENT_PROFILE,
  STUDENT_ACCOUNT_DELETED,

} from "../../actions/adminEtc/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STUDENT_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case GET_STUDENT_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case STUDENT_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_STUDENT_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
