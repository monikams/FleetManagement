import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import VehiclesStore from '../../stores/VehiclesStore';
import VehiclesActions from '../../actions/VehiclesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import shallowEqual from 'shallowequal';
import isNull from 'lodash/isNull';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

class VehiclesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deletedVehicleId: '',
        };
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
       const { params: { companyId } } = this.props;
       VehiclesActions.loadVehicles(companyId);
       setSideBarItem('vehicles');
    }

    componentWillUnmount() {
       VehiclesActions.unloadVehicles();
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    handlePreviewServicesClick(vehicleId) {
        const { params: { companyId } } = this.props;
        this.props.router.push({ pathname: `/companies/${companyId}/vehicles/${vehicleId}` });
    }

    handleEditClick(vehicleId) {
        const { params: { companyId } } = this.props;
        this.props.router.replace(`/companies/${companyId}/editVehicle/${vehicleId}`);
    };

     handleDelete(vehicleId) {
        const { params: { companyId } } = this.props;
        VehiclesActions.deleteVehicle(vehicleId, companyId);
    };

    handleCreateVehicleClick = () => {
        const { params: { companyId } } = this.props;
        this.props.router.replace(`/companies/${companyId}/createVehicle`);
    };

     handleOpenDeleteModal = vehicleId => {
        this.setState({ deletedVehicleId: vehicleId });
    }

    handleCloseDeleteModal = vehicleId => {
        this.setState({ deletedVehicleId: "" });
    };

    renderDeleteModal = vehicleId =>
    (
        <Dialog
          open={!isEmpty(this.state.deletedVehicleId)}
          onClose={this.handleCloseDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to permanantly remove this vehicle?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDelete(vehicleId)} color="primary" variant="contained" className={this.props.classes.button} >
               Yes
            </Button>
            <Button onClick={this.handleCloseDeleteModal} variant="contained" className={this.props.classes.button} >
                Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );

    render() {      
        const { vehicles, classes } = this.props;
        const { deletedVehicleId } = this.state;
              
        return (
            <div>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleCreateVehicleClick}
                    id='createVehicleButton'
                >
                    Create vehicle
                </Button>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>VIN</TableCell>
                            <TableCell>Plate Number</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Driver</TableCell>
                            <TableCell>Preview</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {vehicles.map(vehicle => {
                            return (
                            <TableRow key={vehicle.Id}>
                                <TableCell>{vehicle.VIN}</TableCell>
                                <TableCell>{vehicle.PlateNumber}</TableCell>
                                <TableCell>{vehicle.Type}</TableCell>
                                <TableCell>{vehicle.Brand}</TableCell>
                                <TableCell>{vehicle.Model}</TableCell>
                                <TableCell>{!isNull(vehicle.Driver) && vehicle.Driver.Name}</TableCell>
                                <TableCell><Search color="primary" onClick={() => this.handlePreviewServicesClick(vehicle.Id)} /></TableCell>
                                <TableCell><EditIcon onClick={() => this.handleEditClick(vehicle.Id)} /></TableCell>
                                <TableCell><DeleteIcon color="secondary" onClick={() => this.handleOpenDeleteModal(vehicle.Id)} /></TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
                {!isEmpty(deletedVehicleId) && this.renderDeleteModal(deletedVehicleId)}
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