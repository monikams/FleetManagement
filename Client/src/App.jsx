import React, { Component } from 'react';
import './styles/App.css';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import CompaniesContainer from './components/Companies/CompaniesContainer.jsx';
import CreateCompanyContainer from './components/Companies/CreateCompanyContainer.jsx';
import EditCompanyContainer from './components/Companies/EditCompanyContainer.jsx';
import VehiclesContainer from './components/Vehicles/VehiclesContainer.jsx';
import Drivers from './components/Drivers.jsx';
import AuthorizationContainer from './components/Authorization/AuthorizationContainer.jsx';
import RegistrationContainer from './components/Authorization/RegistrationContainer.jsx';
import LoginContainer from './components/Authorization/LoginContainer.jsx';
import Home from './components/Home.jsx';

class App extends Component {
    render() {
        return (       
            <Router history={browserHistory}>     
                    <Route path='/' component={AuthorizationContainer} > 
                        <Route path='register' component={RegistrationContainer} />
                        <Route path='login' component={LoginContainer} />
                    </Route>
                    <Route path='/' component={Home} >
                        <Route path='companies' component={CompaniesContainer} />
                            <Route path='createCompany' component={CreateCompanyContainer} />
                            <Route path='editCompany/(:companyId)' component={EditCompanyContainer} />
                        <Route path='vehicles' component={VehiclesContainer} />    
                        <Route path='drivers' component={Drivers} />
                    </Route>                                        						
			</Router>
        );
    }
}

export default App;