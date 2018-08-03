import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SpaceAdd from "./SpaceAdd";

class Spaces extends React.Component {
    state = {
        displayAddSpace: false,
    };


    handleAddSpace = () => {
        this.setState({
            displayAddSpace: true
        });
    };

    handleAddSpaceUnmount = () => {
        this.setState({displayAddSpace: false})
    }

    render() {
       const  spaces = this.props.spaces;
        return (
            <div>
            <ul className={'spaces-list'}>
                <li>
                    <Link to={'/add/space'}>
                        <div className={'add'}>
                            <span>D</span>
                        </div>
                    </Link>
                    <span>1 Online</span>
                    <hr/>
                </li>
                {
                    Object.keys(spaces).map((key) => {
                        const space = spaces[key];

                        const first = space.name.charAt(0);

                        return (
                            <li key={space.id}>
                                <Link to={'/spaces/' + space.id}>
                                    <div className={'icon'}>
                                        <span>{first}</span>
                                        </div>
                                    </Link>
                            </li>
                        )
                    })
                }
                <li>

                    <div
                        style={{cursor: "pointer"}}
                        className={'add'}
                    onClick={this.handleAddSpace}>
                        <span>+</span>
                    </div>

                </li>

            </ul>

                {this.state.displayAddSpace === true ?
                    <SpaceAdd unmountMe={this.handleAddSpaceUnmount}
                    /> : null
                }
            </div>

        )
    }
}



function mapStateToProps({ spaces }) {


    return {
        spaces
    }
}

export default connect(mapStateToProps)(Spaces)