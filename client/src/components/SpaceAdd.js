import React from 'react';





class SpaceAdd extends React.Component {

    dismiss = (e) => {
        if (e.target.id === 'modal-background') {
            this.props.unmountMe();
        }
    };

    render() {
        return (
            <div className={'modal-container'} onClick={this.dismiss} id={'modal-background'}>
                <div className={'space-add-container'}>
                        <h2 style={{color: '#354cf1', padding: 0, margin: 0}}>CREATE</h2>
                        <p style={{color: '#70707d'}}>Create a new space and add whoever you want!</p>
                        <button className={'space-add-btn'}>Create a Space</button>

                </div>
            </div>
        )
    }
}

export default SpaceAdd;