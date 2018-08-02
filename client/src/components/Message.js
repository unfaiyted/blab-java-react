import React from 'react';




class Message extends React.Component {

    render() {
        const { id, message, sentBy} = this.props.message;
        return (
            <div key={id} className={'message-container'}>
                <div className={'avatar'}>

                </div>
                <div className={'message'}>
                    <span className={'username'}>{sentBy.username} </span>
                    <span className={'time'}> Today at 11:49am</span>
                    <div className={'content'}>  {message}
                    </div>

                </div>
            </div>
        )
    }
}

export default Message;