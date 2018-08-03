import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import AppRouter from "./AppRouter";
import connect from "react-redux/es/connect/connect";



class Home extends React.Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
    }

    async componentDidMount() {

    }

    render() {
        console.log("authed user value:", this.props.authedUser);
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