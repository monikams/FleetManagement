import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import VehiclesStore from '../../stores/VehiclesStore';
import VehiclesActions from '../../actions/VehiclesActions.js';
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

class VehiclesContainer extends Component {

    constructor(props) {
        super(props);
    }

    static getStores() {
        return [VehiclesStore];
    }

    static getPropsFromStores() {
        return {
            vehicles: VehiclesStore.getVehicles(),           
        }
    }

    componentWillMount() {
        VehiclesActions.loadVehicles();
    }

    handleEditClick(vehicleId) {
        this.props.router.push({ pathname: `/editVehicle/${vehicleId}` });
    };

     handleDeleteClick(vehicleId) {
        VehiclesActions.deleteVehicle(vehicleId);
    };

    handleCreateVehicleClick = () => {
         this.props.router.push('/createVehicle');
    };

    render() {      
        const { vehicles, classes } = this.props;
    
        return (
            <div>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleCreateVehicleClick}
                    id='loginButton'
                >
                    Create vehicle
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
                        {vehicles.map(vehicle => {
                            return (
                            <TableRow key={vehicle.Id}>
                                <TableCell component="th" scope="row">
                                {vehicle.Name}
                                </TableCell>
                                <TableCell>{vehicle.Address}</TableCell>
                                <TableCell>{vehicle.Email}</TableCell>
                                <TableCell>{vehicle.Telephone}</TableCell>
                                <TableCell><EditIcon onClick={() => this.handleEditClick(vehicle.Id)} /></TableCell>
                                <TableCell><DeleteIcon onClick={() => this.handleDeleteClick(vehicle.Id)} /></TableCell>
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

VehiclesContainer.propTypes = {
    vehicles: PropTypes.instanceOf(Immutable.Iterable),
    classes: PropTypes.object.isRequired,
};

VehiclesContainer.defaultProps = {
    vehicles: Immutable.List(),
};

export default withStyles(styles)(withRouter(connectToStores(VehiclesContainer)));