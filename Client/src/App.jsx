import React, { Component } from 'react';
import './styles/App.css';
import { Router, IndexRoute , Route, browserHistory } from 'react-router';

import Home from './components/Home.jsx';
import PreviewCompany from './components/PreviewCompany/PreviewCompany.jsx';
import PreviewVehicle from './components/PreviewVehicle/PreviewVehicle.jsx';

import AuthorizationContainer from './components/Authorization/AuthorizationContainer.jsx';
import RegistrationContainer from './components/Authorization/RegistrationContainer.jsx';
import LoginContainer from './components/Authorization/LoginContainer.jsx';

import CompaniesContainer from './components/Companies/CompaniesContainer.jsx';
import CreateCompanyContainer from './components/Companies/CreateCompanyContainer.jsx';
import EditCompanyContainer from './components/Companies/EditCompanyContainer.jsx';

import DriversContainer from './components/Drivers/DriversContainer.jsx';
import CreateDriverContainer from './components/Drivers/CreateDriverContainer.jsx';
import EditDriverContainer from './components/Drivers/EditDriverContainer.jsx';

import VehiclesContainer from './components/Vehicles/VehiclesContainer.jsx';
import CreateVehicleContainer from './components/Vehicles/CreateVehicleContainer.jsx';
import EditVehicleContainer from './components/Vehicles/EditVehicleContainer.jsx';

import ServicesContainer from './components/Services/ServicesContainer.jsx';

class App extends Component {
    render() {
        return (       
            <Router history={browserHistory}>     
                    <Route path='/' component={AuthorizationContainer} >
                        <IndexRoute component={LoginContainer} />
                        <Route path='register' component={RegistrationContainer} />
                    </Route>
                    <Route path='/companies' component={Home} >
                        <IndexRoute component={CompaniesContainer} />
                        <Route path='/createCompany' component={CreateCompanyContainer} />
                        <Route path='/editCompany/:companyId' component={EditCompanyContainer} />
                        <Route path='/companies/:companyId' component={PreviewCompany} >
                            <IndexRoute component={DriversContainer} />
                            <Route path='createDriver' component={CreateDriverContainer} />
                            <Route path='editDriver/:driverId' component={EditDriverContainer} />                    
                            <Route path='createVehicle' component={CreateVehicleContainer} />
                            <Route path='editVehicle/:vehicleId' component={EditVehicleContainer} />
                            <Route path='vehicles' component={PreviewVehicle} >
                                <IndexRoute component={VehiclesContainer} />
                                <Route path=':vehicleId' component={ServicesContainer} />
                            </Route>    
                        </Route>
                    </Route>                                        						
			</Router>
        );
    }
}

export default App;