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
            <form className={'login-form'}>
                <p>You must log in to view the page {this.props.redirects.currentUrl}</p>

                <label>Username</label>
                         <input type={'text'} name={'username'} id={'username'} />
                <label>Password</label>
                <input type={'password'}  name={'password'} id='password' />
                <button onClick={this.login}>Log in</button>
            </form>
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