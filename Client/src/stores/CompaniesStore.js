import alt from '../alt.js';
import CompaniesActions from '../actions/CompaniesActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class CompaniesStore {
    constructor() {
        this.bindActions(CompaniesActions);
        this.state = new Immutable.Map({
            companies: Immutable.List(),
            company: Immutable.Map(),
        });
    }

    loadCompanies(companies) {
        this.setState(this.state.set("companies", Immutable.List(companies)));
    }

    loadCompany(company) {
        this.setState(this.state.set("company", Immutable.Map(company)));
    }

    static getCompanies() {
        return this.getState().get("companies");
    }

     static getCompany() {
        return this.getState().get("company");
    }
}

export default alt.createStore(ImmutableUtil(CompaniesStore));