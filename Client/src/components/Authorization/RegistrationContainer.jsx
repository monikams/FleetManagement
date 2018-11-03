import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
// import RegistrationStore from '../stores/RegistrationStore';
// import RegistrationActions from '../actions/RegistrationActions.js'
import connectToStores from 'alt-utils/lib/connectToStores'

class RegistrationContainer extends Component {
    // static getStores() {
    //     return [RegistrationStore];
    // }

    // static getPropsFromStores() {
    //     return {
    //         Registration: RegistrationStore.getRegistration(),           
    //     }
    // }

    render() {       
        return (
            <p>Registration</p>
        );
    }
}

RegistrationContainer.propTypes = {
    Registration: PropTypes.instanceOf(Immutable.Iterable),
};

RegistrationContainer.defaultProps = {
    Registration: Immutable.List(),
};

// export default connectToStores(RegistrationContainer);
export default RegistrationContainer;