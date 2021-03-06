import React from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from "../actions/shared";
import {setRedirectUrl} from "../actions/redirect";
import Login from "./Login";
import {Route, Switch} from "react-router-dom";
import Spaces from "./Spaces";
import Channels from "./Channels";
import Conversation from "./Conversation";
import {getInitialData} from "../utils/api";

class EnsureLoggedInContainer extends React.Component {
    state = {
        isAuthenticated: false
    };

    static defaultProps = {
        authedUser: {
            isAuthenticated: false
        }
    };

    componentDidMount() {
        const { dispatch, currentURL, authedUser } = this.props;

        if (authedUser && authedUser.isAuthenticated) {
            this.setState({
                isAuthenticated: true
            });

        } else {
            dispatch(setRedirectUrl(currentURL));
           this.props.history.replace("/");
            this.setState({
                isAuthenticated: false
            });
        }

    }



    render() {
        if (this.state.isAuthenticated) {
            console.log("authenticated routes");
            return (
                <div>
                <Route exact path={'/'} component={Spaces} />
                <Route path={'/spaces/:id'} component={Channels}  />
                <Route path={'/channel/:id'} component={Conversation}/>
                </div>

            )
        } else {
            return <Login/>
        }
    }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
    return {
        authedUser: state.authedUser,
        currentURL: ownProps.location.pathname
    }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)