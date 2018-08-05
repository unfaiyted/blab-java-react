import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Spaces from './Spaces';
import Channels from './Channels';
import Conversation from "./Conversation";
import {connect} from 'react-redux';
import EnsureLoggedInContainer from './EnsureLoggedInContainer'
import { checkValidLoginState } from "../utils/security/auth";
import {handleAuthData} from "../actions/authUser";


class AppRouter extends React.Component {

    async componentWillMount() {
        const {dispatch} = this.props;
        const isAuthenticated =  await checkValidLoginState();
        console.log(isAuthenticated);

    }

    render() {
        return (
            <Switch>
                <Route component={EnsureLoggedInContainer} />
            </Switch>

        )
    }

}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }

}

export default connect()(AppRouter);