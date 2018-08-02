import React from 'react'
import { connect } from 'react-redux'
import Spaces from "./Spaces";
import Channels from "./Channels";


class Messages extends React.Component {

    render() {
        const { spaceId } = this.props.channel[0];
        console.log(spaceId);
        return(
            <div>
                <Channels space={spaceId}/>
            <div className={'messages-container'}>
                I am messages! Hello
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
            spaceId: space.id
        }
    }).filter((chan) => chan.id === parseInt(passedId));

    console.log("channel", channel);

    return {
        channel,
    }

}

export default connect(mapStateToProps)(Messages);