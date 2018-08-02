import React from 'react'
import {connect} from 'react-redux'
import Spaces from "./Spaces";
import { NavLink } from 'react-router-dom';
import SpaceHeader from "./SpaceHeader";


//TODO: add something to check which channel is currently selected
class Channels extends React.Component {

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
                            <li key={channel.id}>#
                                <NavLink activeStyle={'active'} to={'/channel/' + channel.id}> {channel.name}</NavLink>
                                </li>
                            )
                        }) }

                    </ul>
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


export default connect(mapStateToProps)(Channels);





