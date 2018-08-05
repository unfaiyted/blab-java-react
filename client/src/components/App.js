import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import { CookiesProvider  } from 'react-cookie'
import createHistory from 'history/createBrowserHistory';
import {navigateTo} from "../actions/redirect";
import Home from "./Home";
import {handleInitialData} from "../actions/shared";
import {login} from "../utils/security/auth";


const history = createHistory();

class App extends Component {

    componentDidUpdate(prevProps) {
        const {  authedUser } = this.props;
            if(authedUser && authedUser.isAuthenticated) {
                console.log("user was authenticated", authedUser);

            }
    }

  render() {
    return (
        <CookiesProvider>
        <Router history={history}>
            <Home/>
        </Router>
        </CookiesProvider>
    );
  }
}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.loggedIn,
        authedUser: state.authedUser,
        redirectUrl: state.redirectUrl
    }
}

export default connect(mapStateToProps)(App);
