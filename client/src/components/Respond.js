import React from 'react'


class Respond extends React.Component {


    render() {
        const { name } = this.props;
        return (
            <div className={'respond-container'}>
                <hr/>
                <input  type={'text'}
                        placeholder={'Message #' + name.toLowerCase().replace(" ","-")}

                />
            </div>
        )
    }

}


export default Respond;