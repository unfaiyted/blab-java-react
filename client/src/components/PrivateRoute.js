import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import React from "react";


const PrivateRoute = ({ component: Component, ...rest }) => {

    return(
    <Route
        {...rest}
        render={props =>
            (isAuthenticated ? (
                <Component {...props} />)
                :
                (<Redirect
                    to={{
                        pathname: "/login", state: { from: props.location }
                    }}
                    />))
        }
    />
)};


function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(PrivateRoute)