import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import VehiclesStore from '../../stores/VehiclesStore';
import VehiclesActions from '../../actions/VehiclesActions.js';
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
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
      marginTop: '15px', 
  }
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
       const { params: { companyId } } = this.props;
       VehiclesActions.loadVehicles(companyId);
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

     handleDeleteClick(vehicleId) {
        const { params: { companyId } } = this.props;
        VehiclesActions.deleteVehicle(vehicleId, companyId);
    };

    handleCreateVehicleClick = () => {
        const { params: { companyId } } = this.props;
        this.props.router.replace(`/companies/${companyId}/createVehicle`);
    };

    handleCompanyChange = event => {
        const companyId = event.target.value;
        this.setState({ companyId });
        VehiclesActions.loadVehicles(companyId);
    }

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
                            <TableCell>VIN</TableCell>
                            <TableCell>Plate Number</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Preview Services</TableCell>
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
                                <TableCell><Search onClick={() => this.handlePreviewServicesClick(vehicle.Id)} /></TableCell>
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