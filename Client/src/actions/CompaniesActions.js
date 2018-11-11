import alt from '../alt.js';
import CompaniesService from '../services/CompaniesService';

class CompaniesActions {
	constructor() {
		// Here add the actions which will be invoked by components
        // but won't have implementation in the actions file
	}

    loadCompanies() {
           debugger;
        return (dispatch) => {
               debugger;
            CompaniesService.getCompanies()
            .then((response) => {
                   debugger;                          
                dispatch(response.data);
            })
            .catch((error) => {
               // TO DO
            });
        }
    }
}

export default alt.createActions(CompaniesActions);