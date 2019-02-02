import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import DriversStore from '../../stores/DriversStore';
import DriversActions from '../../actions/DriversActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import shallowEqual from 'shallowequal';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setSideBarItem } from '../../utils/authorized-requests.js';

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
  }
});

class DriversContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deletedDriverId: '',
        }
    }

    static getStores() {
        return [DriversStore];
    }

    static getPropsFromStores() {
        return {
            drivers: DriversStore.getDrivers(), 
        }
    }

    componentWillMount() {
        const { params: { companyId } } = this.props;
        DriversActions.loadDrivers(companyId);
        setSideBarItem('drivers');
    }

    componentWillUnmount() {
        DriversActions.unloadDrivers();
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    handleEditClick(driverId) {
        const { params: { companyId } } = this.props;
        this.props.router.replace(`/companies/${companyId}/editDriver/${driverId}`);
    };

    handleDelete(driverId) {
        const { params: { companyId } } = this.props;
        DriversActions.deleteDriver(driverId, companyId);
    };

    handleCreateDriverClick = () => {
        const { params: { companyId } } = this.props;
        this.props.router.replace(`/companies/${companyId}/createDriver`);
    };

    handleOpenDeleteModal = driverId => {
        this.setState({ deletedDriverId: driverId });
    }

    handleCloseDeleteModal = driverId => {
        this.setState({ deletedDriverId: "" });
    };

    renderDeleteModal = driverId =>
    (
        <Dialog
          open={!isEmpty(this.state.deletedDriverId)}
          onClose={this.handleCloseDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to permanantly remove this driver?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDelete(driverId)} color="primary" variant="contained" className={this.props.classes.button} >
               Yes
            </Button>
            <Button onClick={this.handleCloseDeleteModal} variant="contained" className={this.props.classes.button} >
                Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );

    render() {      
        const { drivers, classes } = this.props;
        const { deletedDriverId } = this.state;
        
        return (
            <div>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleCreateDriverClick}
                    id='createDriverButton'
                >
                    Create driver
                </Button>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telephone</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {drivers.map(driver => {
                            return (
                            <TableRow key={driver.Id}>
                                <TableCell component="th" scope="row">
                                {driver.Name}
                                </TableCell>
                                <TableCell>{driver.Address}</TableCell>
                                <TableCell>{driver.Email}</TableCell>
                                <TableCell>{driver.Telephone}</TableCell>
                                <TableCell><EditIcon onClick={() => this.handleEditClick(driver.Id)}/></TableCell>
                                <TableCell><DeleteIcon color="secondary" onClick={() => this.handleOpenDeleteModal(driver.Id)} /></TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
                {!isEmpty(deletedDriverId) && this.renderDeleteModal(deletedDriverId)}
            </div>
        );
    }
}

DriversContainer.propTypes = {
    drivers: PropTypes.instanceOf(Immutable.Iterable),
    classes: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

DriversContainer.defaultProps = {
    drivers: Immutable.List(),
    params: {},
};

export default withStyles(styles)(withRouter(connectToStores(DriversContainer)));