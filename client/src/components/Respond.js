import React from 'react'


class Respond extends React.Component {

    checkKey = (e) => {
        // Send message and have messages history update.
         // message send on enter
        if(e.key === 'Enter') {
            console.log('submit it!');
        }

    };

    render() {
        const { name } = this.props;
        return (
            <div className={'respond-container'}>
                <hr/>
                <input  type={'text'}
                        placeholder={'Message #' + name.toLowerCase().replace(" ","-")}
                        onKeyPress={this.checkKey}
                />
            </div>
        )
    }

}


export default Respond;