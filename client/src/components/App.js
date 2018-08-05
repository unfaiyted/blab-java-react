import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router} from "react-router-dom";
import { CookiesProvider  } from 'react-cookie'
import createHistory from 'history/createBrowserHistory';
import AppRouter from "./AppRouter";

const history = createHistory();

class App extends Component {



  render() {
    return (
        <CookiesProvider>
        <Router history={history}>
           <AppRouter/>
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
