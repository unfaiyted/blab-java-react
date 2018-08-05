import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import AppRouter from "./AppRouter";
import connect from "react-redux/es/connect/connect";


class Home extends React.Component {

    render() {
        return (<div className={'container'}>
                      <AppRouter/>
               </div>);
    }

}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}


export default withCookies(connect(mapStateToProps)(Home));