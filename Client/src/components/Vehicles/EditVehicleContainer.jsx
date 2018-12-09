import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import VehiclesActions from '../../actions/VehiclesActions.js';
import VehiclesStore from '../../stores/VehiclesStore';
import CompaniesStore from '../../stores/CompaniesStore';
import CompaniesActions from '../../actions/CompaniesActions.js';
import DriversStore from '../../stores/DriversStore';
import DriversActions from '../../actions/DriversActions.js';
import EditVehicle from './EditVehicle';
import connectToStores from 'alt-utils/lib/connectToStores';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';

class EditVehicleContainer extends Component {

     constructor(props) {
        super(props);
        this.state = {
		localVehicle: Immutable.Map({
            Id: '',
            VIN: '',
            PlateNumber: '',
            Type: '',
            Brand: '',
            Model: '',
            DriverId: '',
            CompanyId: '',
        }),
	  } 
    }

    static getStores() {
        return [VehiclesStore, DriversStore, CompaniesStore];
    }

    static getPropsFromStores() {
        return {
            vehicle: VehiclesStore.getVehicle(),
            companies: CompaniesStore.getCompanies(),
            drivers: DriversStore.getDrivers(),                
        }
    }

   shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    componentWillMount() {
        const { params: { vehicleId } } = this.props;
        VehiclesActions.loadVehicle(vehicleId);
        CompaniesActions.loadCompanies();
        // TO DO
        DriversActions.loadDrivers();
    }

    componentWillUnmount() { 
        VehiclesActions.unloadVehicle();
    }

    componentWillReceiveProps = nextProps => {
        if (this.props.vehicle !== nextProps.vehicle) {
          const vehicle = nextProps.vehicle;
          const localVehicle = Immutable.Map({
                Id: vehicle.get('Id'), 
                VIN: vehicle.get('VIN'),
                PlateNumber: vehicle.get('PLateNumber'),
                Type: vehicle.get('Type'),
                Brand: vehicle.get('Brand'),
                Model: vehicle.get('Model'),
                DriverId: vehicle.get('DriverId'),
                CompanyId: vehicle.get('CompanyId'),
            });
          this.setState({ localVehicle });
        }
    }

    handleSaveButtonClick = () => {
        const vehicle = this.props.vehicle.get('vehicle');  
        const { localVehicle } = this.state;
        VehiclesActions.editVehicle(localVehicle);
    }

    handleChange = (name, event) => {
        const { target: { value }} = event;  
        const { localVehicle } = this.state;   
        const updatedVehicle = localVehicle.update(name, oldValue => value);
        this.setState({ localVehicle: updatedVehicle });
    };
    
    render() {      
        const { classes, companies, drivers, vehicle, params: { vehicleId  } } = this.props;
        const { localVehicle } = this.state;   
        
        return (
            <EditVehicle
                vehicle={localVehicle}
                companies={companies}
                drivers={drivers}
                vehicleId={vehicleId}
                onSaveButtonClick={this.handleSaveButtonClick}
                onChange={this.handleChange}
            />
        );
    }
}

EditVehicleContainer.propTypes = {
    vehicle: PropTypes.instanceOf(Immutable.Map),
    companies: PropTypes.instanceOf(Immutable.List),
    drivers: PropTypes.instanceOf(Immutable.List),
    params: PropTypes.object.isRequired,
};

EditVehicleContainer.defaultProps = {
    vehicle: Immutable.Map({
        Id: '',
        VIN: '',
        PlateNumber: '',
        Type: '',
        Brand: '',
        Model: '',
        DriverId: '',
        CompanyId: '',
    }),
    companies: Immutable.List(),
    drivers: Immutable.List(),
};

export default connectToStores(EditVehicleContainer);