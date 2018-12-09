import alt from '../alt.js';
import VehiclesActions from '../actions/VehiclesActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class VehiclesStore {
    constructor() {
        this.bindActions(VehiclesActions);
        this.state = new Immutable.Map({
            vehicles: Immutable.List(),
            vehicle: Immutable.Map(),
        });

        this.defaultVehicle = Immutable.Map({
            Id: '',
            Vin: '',
            PlateNumber: '',
            Type: '',
            Brand: '',
            Model: '',
        });
    }

    loadVehicles(vehicles) {
        this.setState(this.state.set('vehicles', Immutable.List(vehicles)));
    }

    loadVehicle(vehicle) {
        this.setState(this.state.set('vehicle', Immutable.Map(vehicle)));
    }

    unloadVehicle() {
        this.setState(this.state.set('vehicle', this.defaultVehicle));
    }

    static getVehicles() {
        return this.getState().get('vehicles');
    }

     static getVehicle() {
        return this.getState().get('vehicle');
    }
}

export default alt.createStore(ImmutableUtil(VehiclesStore));