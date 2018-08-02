import React from 'react'
import {connect} from 'react-redux'
import Spaces from "./Spaces";
import { Link } from 'react-router-dom';



class Channels extends React.Component {

    render() {
        const channels = this.props.spacesChannels;
        return(
            <div>
            <Spaces/>
            <div className={'channel-container'}>
                    <ul>
                        { channels.map((channel) => {
                            return (
                            <li key={channel.id}>#
                                <Link to={'/channel/' + channel.id}> {channel.name}</Link>
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

    console.log("props", props);

    const passedId = (props.space === undefined) ? props.match.params.id : props.space;

    const spacesChannels =Object.keys(channels).map((key) => {
           const { id, name, space } =  channels[key];
        return {
            id,
            name,
            spaceId: space.id
        }
    }).filter((chan) => chan.spaceId === parseInt(passedId));

    return {
        spacesChannels
    }
}


export default connect(mapStateToProps)(Channels);





