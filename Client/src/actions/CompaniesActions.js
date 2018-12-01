import alt from '../alt.js';
import CompaniesService from '../services/CompaniesService';
import { baseURL } from '../Constants.js';

class CompaniesActions {
  constructor() {
    this.generateActions('unloadCompany');
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

    loadCompany(companyId, clearList) {
        return (dispatch) => {
             CompaniesService.getCompany(companyId)
            .then((response) => {   
                dispatch({ company: response.data, clearList });
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