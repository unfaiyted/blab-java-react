import React from 'react'
import {connect} from 'react-redux'
import Spaces from "./Spaces";
import { NavLink} from 'react-router-dom';
import SpaceHeader from "./SpaceHeader";
import {handleMessageData} from "../actions/messages";
import AuthedUser from "./AuthedUser";


//TODO: add something to check which channel is currently selected
class Channels extends React.Component {

    // handleChannelChange = (e) => {
    //     const {dispatch} = this.props;
    //     dispatch(handleMessageData(e.id));
    // };

    render() {
        const channels = this.props.spacesChannels;
        return(
            <div>
            <Spaces/>
            <div className={'channel-container'}>
                    <SpaceHeader name={this.props.spaceName}/>
                    <ul>
                        { channels.map((channel) => {
                            return (
                            <li key={channel.id}
                            id={channel.id}>
                                <NavLink
                                    activeClassName={'active'}
                                    to={'/channel/' + channel.id}
                                ># {channel.name}</NavLink>
                                </li>
                            )
                        }) }

                    </ul>
                <AuthedUser/>
            </div>
            </div>
        )
    }

}

function mapStateToProps({ channels }, props) {
    //channel id

    const passedId = (props.space === undefined) ? props.match.params.id : props.space;

    const spacesChannels =Object.keys(channels).map((key) => {
           const { id, name, space } =  channels[key];
        return {
            id,
            name: name.toLowerCase().replace(" ","-"),
            spaceId: space.id,
            spaceName: space.name
        }
    }).filter((chan) => chan.spaceId === parseInt(passedId));

    const spaceName = spacesChannels[0].spaceName;

    return {
        spacesChannels,
        spaceName
    }
}


export default connect(mapStateToProps, null, null, {pure: false})(Channels);





