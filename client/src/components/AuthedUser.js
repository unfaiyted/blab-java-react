import React from 'react';
import {connect} from 'react-redux'

class AuthedUser extends React.Component {

    render() {
        const { id, username} = this.props.user;
        return (
            <div className={'authedUser-container'}>
                <div className={'avatar'}>
                    {username.toUpperCase().charAt(0)}
                </div>
                <div className={'status'} >
                 </div>

                <span className={'username'}>{username}</span>
                <div className={'action'}>

                    S
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        user: authedUser.user
    }
}


export default connect(mapStateToProps)(AuthedUser);