import React from 'react'
import Input from './Input'
import {handleAuthData} from "../actions/authUser";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };

    login = () => {
        const { dispatch } = this.props;
        dispatch(handleAuthData());
        this.setState({ redirectToReferrer: true });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}


function mapStateToProps({ authedUser }){
    return {
        authedUser
    }
}

export default connect()(Login);