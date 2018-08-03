import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import { CookiesProvider  } from 'react-cookie'

import {navigateTo} from "../actions/redirect";

import Home from "./Home";

class App extends Component {
    // componentDidMount() {
    //     const { dispatch } = this.props;
    //     dispatch(handleInitialData());
    // }

    componentDidUpdate(prevProps) {
        const { dispatch, redirectUrl } = this.props;
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

        if (isLoggingIn) {
            dispatch(navigateTo(redirectUrl))
        } else if (isLoggingOut) {
            // do any kind of cleanup or post-logout redirection here
        }
    }

  render() {
    return (
        <CookiesProvider>
        <Router>
            <Home/>
        </Router>
        </CookiesProvider>
    );
  }
}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.loggedIn,
        redirectUrl: state.redirectUrl
    }
}

export default connect(mapStateToProps)(App);
