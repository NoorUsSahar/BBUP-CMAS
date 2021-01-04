//calendar event reducer
import { GET_EVENT, EVENT_ERROR, CURRENT_EVENT_ERROR, GET_CURRENT_EVENT } from '../../actions/facultysc/types';
const initialState = {
    current_event: null,
    event: null
}
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_EVENT:
            return {
                ...state,
                event: payload
            }

        case GET_CURRENT_EVENT:
            return {
                ...state,
                current_event: payload
            }

        case CURRENT_EVENT_ERROR:
        case EVENT_ERROR:
            return {
                ...state,
                error: payload
            }

        default:
            return state;
    }
}