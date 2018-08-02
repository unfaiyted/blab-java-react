import React from 'react'
import { connect } from 'react-redux'
import Spaces from "./Spaces";
import Channels from "./Channels";
import ChannelHeader from "./ChannelHeader";
import Respond from "./Respond";
import Message from "./Message";


class Messages extends React.Component {

    render() {
        const { spaceId, name } = this.props.channel[0];
        console.log(spaceId);
        return(
            <div>
                <Channels space={spaceId}/>
            <div className={'messages-container'}>
                <ChannelHeader name={name}/>
                <div className={'child-container'}>
                    <Message/>
                </div>

                <Respond/>
            </div>
            </div>
        )
    }

}


function mapStateToProps({ channels }, props) {
    //channel id
    const passedId = props.match.params.id;

    const channel = Object.keys(channels).map((key) => {
        const { id, name, space } =  channels[key];
        return {
            id,
            name,
            spaceId: space.id,
        }
    }).filter((chan) => chan.id === parseInt(passedId));

    console.log("channel", channel);

    return {
        channel,
    }

}

export default connect(mapStateToProps)(Messages);