import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import CompaniesStore from '../stores/CompaniesStore';
import CompaniesActions from '../actions/CompaniesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class CreateCompanyContainer extends Component {

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
        const { companies, classes } = this.props;
    
        return (
            <div>
               Hello
            </div>
        );
    }
}

CreateCompanyContainer.propTypes = {
    companies: PropTypes.instanceOf(Immutable.Iterable),
    classes: PropTypes.object.isRequired,
};

CreateCompanyContainer.defaultProps = {
    companies: Immutable.List(),
};

export default withStyles(styles)(connectToStores(CreateCompanyContainer));