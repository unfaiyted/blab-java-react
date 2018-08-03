import React from 'react'


class Respond extends React.Component {


    render() {
        return (
            <div className={'respond-container'}>
                <hr/>
                <input  type={'text'}
                        placeholder={'Message #channel'}
                />
            </div>
        )
    }

}


export default Respond;