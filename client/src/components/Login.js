import React from 'react'
import Input from './Input'
import {handleAuthData} from "../actions/authUser";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from "../actions/shared";

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };

    submit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        const username = 'test11';
        const password = 'test';

        dispatch(handleAuthData(username, password));
       // this.setState({ redirectToReferrer: true });
    };

    render() {
        const { from } = this.props.redirects.currentUrl || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={''} />;
        }

        const { handleSubmit } = this.props;
        return (
            <div className={'login-container'}>
            <form className={'login-form'} onSubmit={(this.submit)}>
                <p>You must log in to view the page {this.props.redirects.currentUrl}</p>
                <label>Username</label>
                         <input type={'text'} name={'username'} id={'username'} />
                <label>Password</label>
                <input type={'password'}  name={'password'} id='password' />
                <button onClick={this.login}>Log in</button>
            </form>
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