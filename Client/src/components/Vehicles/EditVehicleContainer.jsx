import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import VehiclesActions from '../../actions/VehiclesActions.js';
import VehiclesStore from '../../stores/VehiclesStore';
import DriversStore from '../../stores/DriversStore';
import DriversActions from '../../actions/DriversActions.js';
import EditVehicle from './EditVehicle';
import connectToStores from 'alt-utils/lib/connectToStores';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';

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
                ProductionYear: true,
                Model: '',
                DriverId: '',
                CompanyId: '',
            }),
            isValid: {
                'VIN': true,
                'PlateNumber': true,
                'Type': true,
                'Brand': true,
                'ProductionYear': true,
                'Production Year': true,
           },
	  } 
    }

    static getStores() {
        return [VehiclesStore, DriversStore];
    }

    static getPropsFromStores() {
        return {
            vehicle: VehiclesStore.getVehicle(),
            drivers: DriversStore.getDrivers(),                
        }
    }

   shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    componentWillMount() {
        const { params: { vehicleId, companyId } } = this.props;
        VehiclesActions.loadVehicle(vehicleId);
        DriversActions.loadDrivers(companyId);
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
                PlateNumber: vehicle.get('PlateNumber'),
                Type: vehicle.get('Type'),
                Brand: vehicle.get('Brand'),
                ProductionYear: vehicle.get('ProductionYear'),
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
        const { localVehicle, isValid } = this.state;
        isValid[name] = !isEmpty(value);

        let updatedVehicle;
        if (value === 'withoutDriver') {
            updatedVehicle = localVehicle.update(name, oldValue => '');
        } else {
            updatedVehicle = localVehicle.update(name, oldValue => value);
        }
        
        this.setState({ 
            localVehicle: updatedVehicle,
            isValid: isValid 
        });
    };
    
    render() {      
        const { classes, drivers, params: { vehicleId  } } = this.props;
        const { localVehicle, isValid } = this.state;   
        
        return (
            <EditVehicle
                vehicle={localVehicle}
                drivers={drivers}
                vehicleId={vehicleId}
                onSaveButtonClick={this.handleSaveButtonClick}
                onChange={this.handleChange}
                isValid={isValid}
            />
        );
    }
}

EditVehicleContainer.propTypes = {
    vehicle: PropTypes.instanceOf(Immutable.Map),
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
        ProductionYear: '',
        DriverId: '',
        CompanyId: '',
    }),
    drivers: Immutable.List(),
};

export default connectToStores(EditVehicleContainer);