import React from 'react';
import { connect } from 'react-redux';


class Spaces extends React.Component {


    render() {
       const  spaces = this.props.spaces;
        return (
            <ul>
                {

                    Object.keys(spaces).map((key) => {
                        return (
                            <li>
                                {spaces[key].name}
                            </li>
                        )
                    })
                }
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