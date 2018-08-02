import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading'
import {BrowserRouter as Router} from "react-router-dom";
import {handleInitialData} from "../actions/shared";
import Spaces from "./Spaces";

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData());
    }
  render() {
      const {loading} = this.props;
    return (

        <Router>
            <div className={'container'}>
               Nav {loading === true ? <LoadingBar/> : <Spaces/> }

            </div>
        </Router>
    );
  }
}


function mapStateToProps({ authedUser }) {
    return {
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App);
