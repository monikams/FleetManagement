import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import CompaniesStore from '../stores/CompaniesStore';
import CompaniesActions from '../actions/CompaniesActions.js'
import connectToStores from 'alt-utils/lib/connectToStores';

class Drivers extends Component {
    static getStores() {
        return [CompaniesStore];
    }

    static getPropsFromStores() {
        return {
            companies: CompaniesStore.getCompanies(),           
        }
    }

    componentDidMount() {
        CompaniesActions.loadCompanies();
    }

    render() {      
        const { drivers } = this.props;
        return (
            <p>Drivers</p>
        );
    }
}

Drivers.propTypes = {
    drivers: PropTypes.instanceOf(Immutable.Iterable),
};

Drivers.defaultProps = {
    drivers: Immutable.List(),
};

export default connectToStores(Drivers);
