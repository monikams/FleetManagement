import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import DriversStore from '../../stores/DriversStore';
import DriversActions from '../../actions/DriversActions.js';
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
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router'

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

class DriversContainer extends Component {

    constructor(props) {
        super(props);
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
        DriversActions.loadDrivers();
    }

    handleEditClick(driverId) {
        this.props.router.push({ pathname: `/editDriver/${driverId}` });
    };

     handleDeleteClick(driverId) {
        DriversActions.deleteDriver(driverId);
    };

    handleCreateDriverClick = () => {
         this.props.router.push('/createDriver');
    };

    render() {      
        const { drivers, classes } = this.props;
    
        return (
            <div>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleCreateDriverClick}
                    id='loginButton'
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
                                <TableCell><EditIcon onClick={() => this.handleEditClick(driver.Id)} /></TableCell>
                                <TableCell><DeleteIcon onClick={() => this.handleDeleteClick(driver.Id)} /></TableCell>
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

DriversContainer.propTypes = {
    Vehicles: PropTypes.instanceOf(Immutable.Iterable),
    classes: PropTypes.object.isRequired,
};

DriversContainer.defaultProps = {
    Vehicles: Immutable.List(),
};

export default withStyles(styles)(withRouter(connectToStores(DriversContainer)));