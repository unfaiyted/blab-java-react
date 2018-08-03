import Message from "./Message";
import React from "react";
import connect from "react-redux/es/connect/connect";


class Messages extends React.Component {

    componentDidMount() {
        let element = document.getElementById("messagesContainer");
        element.scrollTop = element.scrollHeight;
    }

    componentDidUpdate() {
        let element = document.getElementById("messagesContainer");
        element.scrollTop = element.scrollHeight;
    }

    render() {
        const { conversation, changes } = this.props;
       return(
           <div className={'messages-container'} id='messagesContainer'>
               {
                   conversation.map((message) => {
                       return <Message message={message} />
                   })
               }
           </div>)
    }
}

function mapStateToProps({ messages }) {


    const conversation = Object.keys(messages).map((key) => {
        const { id, message, sentBy } =  messages[key];
        return {
            id,
            message,
            sentBy,
        }
    });

    return {
        conversation
    }

}

export default connect(mapStateToProps)(Messages);
