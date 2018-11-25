import alt from '../alt.js';
import CompaniesService from '../services/CompaniesService';
import { baseURL } from '../Constants.js';

class CompaniesActions {
	constructor() {
		// Here add the actions which will be invoked by components
        // but won't have implementation in the actions file
	}

    loadCompanies() {
        return (dispatch) => {
             CompaniesService.getCompanies()
            .then((response) => {    
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

    loadCompany(companyId) {
        return (dispatch) => {
             CompaniesService.getCompany(companyId)
            .then((response) => {    
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

     createCompany(company){
        return (dispatch) => {
            CompaniesService.createCompany(company)
            .then((response) => {
                this.loadCompanies();
                window.location.href = baseURL + '/companies';                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    editCompany(company){
        return (dispatch) => {
            CompaniesService.editCompany(company)
            .then((response) => {
                this.loadCompanies();
                window.location.href = baseURL + '/companies';                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    deleteCompany(companyId) {
        return (dispatch) => {
            CompaniesService.deleteCompany(companyId)
            .then((response) => {
                this.loadCompanies();                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}

export default alt.createActions(CompaniesActions);