import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading'
import {BrowserRouter as Router} from "react-router-dom";
import {handleInitialData} from "../actions/shared";
import { CookiesProvider  } from 'react-cookie'
import Spaces from "./Spaces";

import AppRouter from "./AppRouter";
import Home from "./Home";

class App extends Component {
    // componentDidMount() {
    //     const { dispatch } = this.props;
    //     dispatch(handleInitialData());
    // }
  render() {
      const {loading} = this.props;
    return (

        <CookiesProvider>
        <Router>
            <Home/>
        </Router>
        </CookiesProvider>
    );
  }
}


function mapStateToProps({ authedUser }) {
    return {
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App);
