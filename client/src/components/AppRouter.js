import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Spaces from './Spaces';
import Channels from './Channels';
import Conversation from "./Conversation";
import {connect} from 'react-redux';
import EnsureLoggedInContainer from './EnsureLoggedInContainer'
import { checkValidLoginState } from "../utils/security/auth";
import {handleInitialData} from "../actions/shared";

class AppRouter extends React.Component {
    state = {
        isAuthenticated: false
    };

    async componentWillMount() {
        const {dispatch} = this.props;
        const isAuthenticated =  await checkValidLoginState();


        this.setState({
            isAuthenticated
        });

    }

    componentWillReceiveProps() {
        const {dispatch} = this.props;


    }


    render() {
        return (
            <div className={'container'}>
                        {(!this.state.isAuthenticated) ?
                            (
                                <Switch>
                                    <Route component={EnsureLoggedInContainer}/>
                                </Switch>
                            ) : (
                                <Switch>
                                    <Route exact path={'/'} component={Spaces} />
                                    <Route path={'/spaces/:id'} component={Channels}  />
                                    <Route path={'/channel/:id'} component={Conversation}/>
                                </Switch>
                            )
                            }
                </div>
        )
    }

}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }

}

export default connect()(AppRouter);