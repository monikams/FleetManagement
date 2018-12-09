import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import VehiclesStore from '../../stores/VehiclesStore';
import CompaniesStore from '../../stores/CompaniesStore';
import VehiclesActions from '../../actions/VehiclesActions.js';
import CompaniesActions from '../../actions/CompaniesActions.js';
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
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: '80px',
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
      marginTop: '15px', 
  }
});

class VehiclesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyId: '',
        };
    }

    static getStores() {
        return [CompaniesStore, VehiclesStore];
    }

    static getPropsFromStores() {
        return {
            vehicles: VehiclesStore.getVehicles(),
            companies: CompaniesStore.getCompanies(),     
        }
    }

    componentWillMount() {
        CompaniesActions.loadCompanies();
    }

    componentWillUnmount() {
       VehiclesActions.unloadVehicles();
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    handleEditClick(vehicleId) {
        this.props.router.push({ pathname: `/editVehicle/${vehicleId}` });
    };

     handleDeleteClick(vehicleId) {
        VehiclesActions.deleteVehicle(vehicleId);
    };

    handleCreateVehicleClick = () => {
         this.props.router.push('/createVehicle');
    };

    handleCompanyChange = event => {
        const companyId = event.target.value;
        this.setState({ companyId });
        VehiclesActions.loadVehicles(companyId);
    }

    render() {      
        const { vehicles, classes } = this.props;
        const { companyId } = this.state;
        let companies;
        if (this.props.companies !== undefined) {
            if (this.props.companies.size === 1) {
                companies = this.props.companies.first();
                VehiclesActions.loadVehicles(this.props.companies.first().Id);
            } else {
                companies = this.props.companies;
            }
        }
              
        return (
           companies !== undefined ?
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
                {companies.size >= 2 &&
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="age-simple">Select company</InputLabel>
                    <Select
                        displayEmpty
                        value={companyId}
                        onChange={this.handleCompanyChange}
                    >
                        {companies.map(company => (
                            <MenuItem key={company.Id} value={company.Id}>{company.Name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>}
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>VIN</TableCell>
                            <TableCell>Plate Number</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
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
                                <TableCell>Preview</TableCell>
                                <TableCell><EditIcon onClick={() => this.handleEditClick(vehicle.Id)} /></TableCell>
                                <TableCell><DeleteIcon onClick={() => this.handleDeleteClick(vehicle.Id)} /></TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
            </div> : null
        );
    }
}

VehiclesContainer.propTypes = {
    vehicles: PropTypes.instanceOf(Immutable.Iterable),
    companies: PropTypes.instanceOf(Immutable.Iterable),
    classes: PropTypes.object.isRequired,
};

VehiclesContainer.defaultProps = {
    vehicles: Immutable.List(),
    companies: Immutable.List(),
};

export default withStyles(styles)(withRouter(connectToStores(VehiclesContainer)));