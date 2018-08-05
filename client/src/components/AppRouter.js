import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Spaces from './Spaces';
import Channels from './Channels';
import Conversation from "./Conversation";
import {connect} from 'react-redux';
import EnsureLoggedInContainer from './EnsureLoggedInContainer'
import {handleAuthenticatedUser} from "../actions/shared";

class AppRouter extends React.Component {
    state = {
        isAuthenticated: false
    };

    async componentDidMount() {
        const {dispatch, authedUser} = this.props;

           const isAuth = await dispatch(handleAuthenticatedUser());

            if(isAuth === true) {
                this.setState({
                    isAuthenticated: true,
                })
            }
    }

    render() {
        return (
            <Switch>
                {!this.state.isAuthenticated ?
                    <Route component={EnsureLoggedInContainer}/>: null}

                <Route exact path={'/'} component={Spaces} />
                <Route path={'/spaces/:id'} component={Channels}  />
                <Route path={'/channel/:id'} component={Conversation}/>
            </Switch>



            )

    }

}

function mapStateToProps(state) {
    return state

}

export default withRouter(connect(mapStateToProps)(AppRouter));