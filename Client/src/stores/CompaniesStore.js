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

        this.defaultCompany = Immutable.Map({
            company: Immutable.Map({
                Id: '',
                CreatorId: '',
                Name: '',
                Email: '',
                Address: '',
                Telephone: '',
                Subscribers: Immutable.List(),
                Creator: {},
            }),
            isLoading: true,
            doneLoading: false,
        });
    }

    loadCompanies(companies) {
        this.setState(this.state.set('companies', Immutable.List(companies)));
    }

    loadCompany({ company, clearList }) {
        const nextState = this.defaultCompany.withMutations(tempState => {
            if (clearList) {
                tempState.set('company', Immutable.Map());
                tempState.set('doneLoading', false);
            }
            tempState.set('company', Immutable.Map(company));
            tempState.set('isLoading', false);
            if (!company.length) {
                tempState.set('doneLoading', true);
            }
        });

        this.setState(this.state.set('company', nextState));
    }

    unloadCompany() {
        this.setState(this.state.set('company', this.defaultCompany));
    }

    static getCompanies() {
        return this.getState().get('companies');
    }

     static getCompany() {
        return this.getState().get('company');
    }
}

export default alt.createStore(ImmutableUtil(CompaniesStore));