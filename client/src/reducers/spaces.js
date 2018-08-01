import { ADD_SPACE, REMOVE_SPACE, RECEIVE_SPACES } from "../actions/spaces";

export default function spaces(state = {}, action) {
    switch (action.type) {
        case ADD_SPACE:
            return state.concat([action.space]);
        case REMOVE_SPACE:
            return state.filter((space) => space.id !== action.id);
        case RECEIVE_SPACES:
            return {
                ...state,
                ...action.spaces,
            };
        default:
            return state;

    }
}


