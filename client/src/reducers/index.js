import { combineReducers } from 'redux'

import users from './users';
import channels from './channels'
import spaces from './spaces'
import messages from './messages'
import authedUser from './authedUser'
import redirects from './redirect'
import { loadingBarReducer } from 'react-redux-loading'


export default combineReducers({
    authedUser,
    spaces,
    channels,
    users,
    messages,
    redirects,
    loadingBar: loadingBarReducer
})