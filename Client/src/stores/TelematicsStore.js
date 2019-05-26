import alt from '../alt.js';
import TelematicsActions from '../actions/TelematicsActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class TelematicsStore {
    constructor() {
        this.bindActions(TelematicsActions);
        this.state = new Immutable.Map({
            telematicsData: Immutable.List(),
            telematicsDataHistory: Immutable.List(),
        });

        this.defaultTelematicsData = Immutable.List();
        this.defaultTelematicsDataHistory = Immutable.List();
        this.defaultAverageSpeed = 0; 
    }
        
    loadTelematicsData(telematicsData) {
        this.setState(this.state.set('telematicsData', Immutable.List(telematicsData)));
    }

    loadTelematicsDataHistory(telematicsDataHistory) {
        this.setState(this.state.set('telematicsDataHistory', Immutable.List(telematicsDataHistory)));
    }

    loadAverageSpeed(averageSpeed) {
        this.setState(this.state.set('averageSpeed', averageSpeed));
    }

    static getTelematicsData() {
        return this.getState().get('telematicsData');
    }

    static getTelematicsDataHistory() {
        return this.getState().get('telematicsDataHistory');
    }

    static getAverageSpeed() {
        return this.getState().get('averageSpeed');
    }

    unloadTelematicsData() {
        this.setState(this.state.set('telematicsData', this.defaultTelematicsData));
    }

     unloadTelematicsDataHistory() {
        this.setState(this.state.set('telematicsDataHistory', this.defaultTelematicsDataHistory));
    }

     unloadTelematicsData() {
        this.setState(this.state.set('averageSpeed', this.defaultAverageSpeed));
    }
}

export default alt.createStore(ImmutableUtil(TelematicsStore));