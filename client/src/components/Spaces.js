import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Spaces extends React.Component {

    render() {
       const  spaces = this.props.spaces;
        return (

            <ul className={'spaces-list'}>
                <li>
                    Home Icon
                    7 online
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
                  Add
                </li>

            </ul>

        )
    }
}



function mapStateToProps({ spaces }) {


    return {
        spaces
    }
}

export default connect(mapStateToProps)(Spaces)