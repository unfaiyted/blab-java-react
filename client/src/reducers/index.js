import { combineReducers } from 'redux'

import users from './users';
import channels from './channels'
import spaces from './spaces'
import messages from './messages'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'


export default combineReducers({
    authedUser,
    users,
    channels,
    spaces,
    messages,
    loadingBar: loadingBarReducer
})