import React from 'react'



class SpaceHeader extends React.Component {

    render() {
        const { name } = this.props;
        return (
            <div className={'space-header'}>
                {name}
            </div>
        )
    }
}


export default SpaceHeader