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
            vehicle: Immutable.Map({
                Id: '',
                Vin: '',
                PlateNumber: '',
                Type: '',
                Brand: '',
                Model: '',
            }),
            isLoading: true,
            doneLoading: false,
        });
    }

    loadVehicles(vehicles) {
        this.setState(this.state.set('vehicles', Immutable.List(vehicles)));
    }

    loadVehicle({ vehicle, clearList }) {
        const nextState = this.defaultVehicle.withMutations(tempState => {
            if (clearList) {
                tempState.set('vehicle', Immutable.Map());
                tempState.set('doneLoading', false);
            }
            tempState.set('vehicle', Immutable.Map(vehicle));
            tempState.set('isLoading', false);
            if (!vehicle.length) {
                tempState.set('doneLoading', true);
            }
        });

        this.setState(this.state.set('vehicle', nextState));
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