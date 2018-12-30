import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import CompaniesStore from '../../stores/CompaniesStore';
import CompaniesActions from '../../actions/CompaniesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    backgroundColor: '#F0F0F0',
  },
  table: {
    minWidth: 700,
  },
  button: {
      marginTop: '15px',
      height: '40px', 
  },
  container: {
      margin: '30px 40px 30px 40px',
  }
});

class CompaniesContainer extends Component {

    constructor(props) {
        super(props);
    }

    static getStores() {
        return [CompaniesStore];
    }

    static getPropsFromStores() {
        return {
            companies: CompaniesStore.getCompanies(),           
        }
    }

    componentWillMount() {
        CompaniesActions.loadCompanies();
    }

    handlePreviewClick(companyId) {
        this.props.router.push({ pathname: `/companies/${companyId}` });
    };

    handleEditClick(companyId) {
        this.props.router.push({ pathname: `/editCompany/${companyId}` });
    };

     handleDeleteClick(companyId) {
        CompaniesActions.deleteCompany(companyId);
    };

    handleCreateCompanyClick = () => {
         this.props.router.push('/createCompany');
    };

    render() {      
        const { companies, classes } = this.props;
    
        return (
            <div className={classes.container}>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleCreateCompanyClick}
                    id='createCompanyButton'
                >
                    Create company
                </Button>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telephone</TableCell>
                            <TableCell>Preview</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {companies.map(company => {
                            return (
                            <TableRow key={company.Id}>
                                <TableCell component="th" scope="row">
                                {company.Name}
                                </TableCell>
                                <TableCell>{company.Address}</TableCell>
                                <TableCell>{company.Email}</TableCell>
                                <TableCell>{company.Telephone}</TableCell>
                                <TableCell><Search color="primary" onClick={() => this.handlePreviewClick(company.Id)} /></TableCell>
                                <TableCell><EditIcon onClick={() => this.handleEditClick(company.Id)} /></TableCell>
                                <TableCell><DeleteIcon color="secondary" onClick={() => this.handleDeleteClick(company.Id)} /></TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

CompaniesContainer.propTypes = {
    companies: PropTypes.instanceOf(Immutable.Iterable),
    classes: PropTypes.object.isRequired,
};

CompaniesContainer.defaultProps = {
    companies: Immutable.List(),
};

export default withStyles(styles)(withRouter(connectToStores(CompaniesContainer)));