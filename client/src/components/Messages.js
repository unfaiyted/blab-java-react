import Message from "./Message";
import React from "react";
import connect from "react-redux/es/connect/connect";





class Messages extends React.Component {

    render() {
        const { conversation, changes } = this.props;
       return(
           <div className={'messages-container'}>
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
