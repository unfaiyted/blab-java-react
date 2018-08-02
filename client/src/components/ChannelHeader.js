import React from 'react'



class ChannelHeader extends React.Component {

    render() {
        const { name } = this.props;
        return (
            <div className={'channel-header'}>
                # {name}
            </div>
        )
    }
}


export default ChannelHeader