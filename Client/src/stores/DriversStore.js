import alt from '../alt.js';
import DriversActions from '../actions/DriversActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class DriversStore {
    constructor() {
        this.bindActions(DriversActions);
        this.state = new Immutable.Map({
            drivers: Immutable.List(),
            driver: Immutable.Map(),
        });

        this.defaultDriver = Immutable.Map({
            driver: Immutable.Map({
                Id: '',
                Name: '',
                Email: '',
                Address: '',
                Telephone: '',
            }),
            isLoading: true,
            doneLoading: false,
        });
    }

    loadDrivers(drivers) {
        this.setState(this.state.set('drivers', Immutable.List(drivers)));
    }

    loadDriver({ driver, clearList }) {
        const nextState = this.defaultDriver.withMutations(tempState => {
            if (clearList) {
                tempState.set('driver', Immutable.Map());
                tempState.set('doneLoading', false);
            }
            tempState.set('driver', Immutable.Map(driver));
            tempState.set('isLoading', false);
            if (!driver.length) {
                tempState.set('doneLoading', true);
            }
        });

        this.setState(this.state.set('driver', nextState));
    }

    unloadDriver() {
        this.setState(this.state.set('driver', this.defaultDriver));
    }

    static getDrivers() {
        return this.getState().get('drivers');
    }

     static getDriver() {
        return this.getState().get('driver');
    }
}

export default alt.createStore(ImmutableUtil(DriversStore));