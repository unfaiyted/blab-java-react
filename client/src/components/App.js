import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import AppRouter from "./AppRouter";
import LoadingBar from 'react-redux-loading'


class App extends Component {

  render() {
    return (

        <div>
            <LoadingBar/>
            <div className={'container'}>
            <Router>
                <AppRouter/>
            </Router>
            </div>
        </div>
    );
  }
}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.loggedIn,
        authedUser: state.authedUser,
        redirectUrl: state.redirectUrl,
    }
}

export default connect(mapStateToProps)(App);
