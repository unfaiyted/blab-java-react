import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Spaces from './Spaces';
import Channels from './Channels';
import Messages from "./Messages";


class AppRouter extends React.Component {


    render() {
        return (
            <Switch>
                <Route exact path={'/'} component={Spaces} />
                <Route path={'/spaces/:id'} component={Channels} />
                <Route path={'/channel/:id'} component={Messages} />

            </Switch>

        )
    }

}


export default AppRouter