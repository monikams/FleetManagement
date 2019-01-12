import alt from '../alt.js';
import TelematicsActions from '../actions/TelematicsActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class TelematicsStore {
    constructor() {
        this.bindActions(TelematicsActions);
        this.state = new Immutable.Map({
            telematicsData: Immutable.List(),
        }); 
    }
        
    loadTelematicsData(telematicsData) {
        this.setState(this.state.set('telematicsData', Immutable.List(telematicsData)));
    }

    static getTelematicsData() {
        return this.getState().get('telematicsData');
    }
}

export default alt.createStore(ImmutableUtil(TelematicsStore));