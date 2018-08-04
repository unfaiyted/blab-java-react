import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Spaces from './Spaces';
import Channels from './Channels';
import Conversation from "./Conversation";
import EnsureLoggedInContainer from './EnsureLoggedInContainer'



class AppRouter extends React.Component {


    render() {
        return (
            <Switch>
                <Route component={EnsureLoggedInContainer} />
                    {/*<Route exact path={'/'} component={Spaces} />*/}
                    {/*<Route path={'/spaces/:id'} component={Channels}  />*/}
                    {/*<Route path={'/channel/:id'} component={Conversation}/>*/}

            </Switch>

        )
    }

}


export default AppRouter