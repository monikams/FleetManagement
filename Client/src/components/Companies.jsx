import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import CompaniesStore from '../stores/CompaniesStore';
import CompaniesActions from '../actions/CompaniesActions.js'
import connectToStores from 'alt-utils/lib/connectToStores';

class Companies extends Component {
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
        const { companies } = this.props;
        return (
            <p></p>
        );
    }
}

Companies.propTypes = {
    companies: PropTypes.instanceOf(Immutable.Iterable),
};

Companies.defaultProps = {
    companies: Immutable.List(),
};

export default connectToStores(Companies);