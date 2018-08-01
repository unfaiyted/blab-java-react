import { getInitialData } from "../utils/api";
import { receiveSpaces } from "./spaces";
import { receiveChannels} from "./channels";
import { receiveUsers } from "./users";
import { setAuthUser } from "./authUser";
import { showLoading, hideLoading} from 'react-redux-loading';


const AUTHED_ID = 1;

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData().then(({users, spaces, channels}) => {

            dispatch(receiveUsers(users));
            dispatch(receiveChannels(channels));
            dispatch(receiveSpaces(spaces));
            dispatch(setAuthUser(AUTHED_ID));
            dispatch(hideLoading());

        })
    }
}