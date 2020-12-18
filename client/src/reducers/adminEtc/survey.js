import {
    SURVEY_GET_FAILURE,
    SURVEY_GET_SUCCESS,
    GET_SURVEYS_SUCCESS,
    SURVEY_RESPONSE_FAIL,
    SURVEY_RESPONSE_SUCCESS,
    GET_SURVEY_RESP_FAIL,
    GET_SURVEY_RESP_SUCCESS
  } from '../../actions/adminEtc/types';
  
  import {
    GET_SURVEY_DATE_FAIL,
    GET_SURVEY_END_DATE,
    GET_SURVEY_PUBLISH_DATE,
  } from '../../actions/facultysc/types';
  const initialState = {
    survey_forms: null,
    errors: null,
    loading : true,
    surveys_all : null , 
    survey_response : null,
    responses : null,
    end_date: null,
   publish_date: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SURVEY_GET_SUCCESS:
        return {
          ...state,
         
          survey_forms: payload,
          loading: false
        };
        case GET_SURVEYS_SUCCESS:
      return {
        ...state,
        surveys_all: payload,
        loading: false,
      };
      case SURVEY_RESPONSE_SUCCESS:
        return {
          ...state,
          survey_response: payload,
          loading: false,
        };
        case GET_SURVEY_RESP_SUCCESS:
          return{
            ...state,
            responses : payload,
            loading: false,
          };
          case GET_SURVEY_END_DATE:
      return {
        ...state,
        end_date: payload,
        loading: false,
      };
      case GET_SURVEY_PUBLISH_DATE:
      return {
        ...state,
        publish_date: payload,
        loading: false,
      };
     case GET_SURVEY_RESP_FAIL:
      case GET_SURVEY_DATE_FAIL:
     case SURVEY_GET_FAILURE:
       case SURVEY_RESPONSE_FAIL:
         return{
             ...state,
             errors: payload , 
             loading : false
         }

      default:
        return state;
    }
  }
  