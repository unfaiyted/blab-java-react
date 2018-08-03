import React from 'react';

const SpaceFirstPage = (props) => (
        <div>
            <h2 style={{color: '#354cf1', padding: 0, margin: 0}}>CREATE</h2>
            <p style={{color: '#70707d'}}>Create a new space and add whoever you want!</p>
            <button className={'space-add-btn'} onClick={props.next}>Create a Space</button>
        </div>
    );


const SpaceCreatePage = (props) => (
    <div  style={{color: '#545454'}} className={'space-create-page'}>
      <h2 style={{color: '#354cf1', padding: 0, margin: 0}}>CREATE YOUR SPACE</h2>
        <p> By Creating a space you can talk to your friend and do everything you know
            just like discord or maybe like slack. </p>
        <label htmlFor={'add-sever'}>Space Name</label>
        <input type='text'
                placeholder={'Enter a space name'}
                className={'space-add-input'}
                id={'add-server'} />
        <small >By creating a server, you agree to stuff!</small>
        <div className={'nav'}>
        <button className={'space-back-btn'} style={{float: 'left'}} onClick={props.prev}>Back</button>
            <button className={'space-add-btn'} style={{float: 'right'}}>Create</button>
        </div>
    </div>);



class SpaceAdd extends React.Component {
    state = {
      createServer: false,
    };

    dismiss = (e) => {
        if (e.target.id === 'modal-background') {
            this.props.unmountMe();
        }
    };

    handleNextScreen = () => {
        this.setState({
            createServer: true
        })
    };

    handlePrevScreen = () => {
        this.setState({
            createServer: false
        })
    };

    render() {


        return (
            <div className={'modal-container'} onClick={this.dismiss} id={'modal-background'}>
                <div className={'space-add-container'}>
                    {
                        this.state.createServer === false ? <SpaceFirstPage  next={this.handleNextScreen}/> :
                            <SpaceCreatePage prev={this.handlePrevScreen}/>
                    }
                </div>
            </div>
        )
    }
}

export default SpaceAdd;