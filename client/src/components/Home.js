import React, { Component } from 'react';
import { handleAuthData} from "../actions/authUser";
import { withCookies } from 'react-cookie';
import LoadingBar from "react-redux-loading";
import AppRouter from "./AppRouter";
import connect from "react-redux/es/connect/connect";
import Login from "./Login";


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
        const { dispatch } = this.props;
        dispatch(handleAuthData());
    }

    render() {
        console.log("authed user value:", this.props.authedUser);

        // if(this.props.authedUser.isAuthenticated === true) {
        //     return <AppRouter/>
        // }

        return (<div className={'container'}>
            {this.state.isAuthenticated === false ? <Login/> : <AppRouter/> }
        </div>);
    }

}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}



export default withCookies(connect(mapStateToProps)(Home));