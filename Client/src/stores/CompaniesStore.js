import alt from '../alt.js';
import CompaniesActions from '../actions/CompaniesActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class CompaniesStore {
    constructor() {
        this.bindActions(CompaniesActions);
        this.state = new Immutable.Map({
            companies: Immutable.List(),
        });
    }

    loadCompanies(companies) {
        this.setState(this.state.set("companies", Immutable.List(companies)));
    }

    static getCompanies() {
        return this.getState().get("companies");
    }
}

export default alt.createStore(ImmutableUtil(CompaniesStore));