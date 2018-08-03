import React from 'react'
import { connect } from 'react-redux'
import Channels from "./Channels";
import ChannelHeader from "./ChannelHeader";
import Respond from "./Respond";

import {handleMessageData} from "../actions/messages";
import Messages from "./Messages";


class Conversation extends React.Component {
    state = {
        change: false
    };

    componentWillMount() {
        const { id } = this.props.channel[0];
        const {dispatch} = this.props;
        dispatch(handleMessageData(id))
    }

    componentWillReceiveProps(newProps) {
        const passedId = newProps.match.params.id;
        console.log(passedId);

        if(passedId !== this.props.match.params.id) {
            this.setState({
                change: !this.state.change
            });

            const { id } = this.props.channel[0];
            const {dispatch} = this.props;
            dispatch(handleMessageData(id))

        }

    }


    render() {
        const { spaceId, name } = this.props.channel[0];
        const { messages } = this.props;

        return(
            <div>
                <Channels space={spaceId}/>
            <div className={'convo-container'} >
                <ChannelHeader name={name}/>
                      <Messages/>
                <Respond name={name}/>
            </div>
            </div>
        )
    }

}


function mapStateToProps({ channels, messages }, props) {
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




    return {
        channel,
        // conversation,
    }

}

export default connect(mapStateToProps)(Conversation);