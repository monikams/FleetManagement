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
import isEmpty from 'lodash/isEmpty';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
        this.state = {
            deletedCompanyId: '',
        }
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

     handleDelete(companyId) {
        CompaniesActions.deleteCompany(companyId);
        this.handleCloseDeleteModal();
    };

    handleCreateCompanyClick = () => {
        this.props.router.push('/createCompany');
    };

    handleOpenDeleteModal = companyId => {
        this.setState({ deletedCompanyId: companyId });
    }

    handleCloseDeleteModal = companyId => {
        this.setState({ deletedCompanyId: "" });
    };

    renderDeleteModal = companyId =>
    (
        <Dialog
          open={!isEmpty(this.state.deletedCompanyId)}
          onClose={this.handleCloseDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to permanantly remove this company?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDelete(companyId)} color="primary" variant="contained" className={this.props.classes.button} >
               Yes
            </Button>
            <Button onClick={this.handleCloseDeleteModal} variant="contained" className={this.props.classes.button} >
                Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );

    render() {      
        const { companies, classes } = this.props;
        const { deletedCompanyId } = this.state;
    
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
                                <TableCell>{company.CreatorId === localStorage.getItem('userId') && <DeleteIcon color="secondary" onClick={() => this.handleOpenDeleteModal(company.Id)} />}</TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
                {!isEmpty(deletedCompanyId) && this.renderDeleteModal(deletedCompanyId)}
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