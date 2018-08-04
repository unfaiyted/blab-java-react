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
        const { from } = this.props.redirects.currentUrl || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        console.log('from',  from);

        return (
            <div>
                <p>You must log in to view the page at {this.props.redirects.currentUrl}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}


function mapStateToProps({ redirects, authedUser }){
    return {
        redirects,
        authedUser
    }
}

export default connect(mapStateToProps)(Login);