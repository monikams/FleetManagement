import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import CompaniesStore from '../stores/CompaniesStore';
import CompaniesActions from '../actions/CompaniesActions.js'
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        const { companies, classes } = this.props;
    
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell numeric>Telephone</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {companies.map(company => {
                        return (
                        <TableRow key={company.id}>
                            <TableCell component="th" scope="row">
                            {company.Name}
                            </TableCell>
                            <TableCell>{company.Address}</TableCell>
                            <TableCell>{company.Email}</TableCell>
                            <TableCell numeric>{company.Telephone}</TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

Companies.propTypes = {
    companies: PropTypes.instanceOf(Immutable.Iterable),
    classes: PropTypes.object.isRequired,
};

Companies.defaultProps = {
    companies: Immutable.List(),
};

export default withStyles(styles)(connectToStores(Companies));