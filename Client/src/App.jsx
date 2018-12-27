import React, { Component } from 'react';
import './styles/App.css';
import { Router, IndexRoute , Route, browserHistory } from 'react-router';

import CompaniesContainer from './components/Companies/CompaniesContainer.jsx';
import CreateCompanyContainer from './components/Companies/CreateCompanyContainer.jsx';
import EditCompanyContainer from './components/Companies/EditCompanyContainer.jsx';

import DriversContainer from './components/Drivers/DriversContainer.jsx';
import CreateDriverContainer from './components/Drivers/CreateDriverContainer.jsx';
import EditDriverContainer from './components/Drivers/EditDriverContainer.jsx';

import VehiclesContainer from './components/Vehicles/VehiclesContainer.jsx';
import CreateVehicleContainer from './components/Vehicles/CreateVehicleContainer.jsx';
import EditVehicleContainer from './components/Vehicles/EditVehicleContainer.jsx';

import AuthorizationContainer from './components/Authorization/AuthorizationContainer.jsx';
import RegistrationContainer from './components/Authorization/RegistrationContainer.jsx';
import LoginContainer from './components/Authorization/LoginContainer.jsx';

import Home from './components/Home.jsx';
import PreviewCompany from './components/PreviewCompany/PreviewCompany.jsx';

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
                            <Route path='vehicles' component={VehiclesContainer} />
                            <Route path='createVehicle' component={CreateVehicleContainer} />
                            <Route path='editVehicle/:vehicleId' component={EditVehicleContainer} />
                        </Route>
                    </Route>                                        						
			</Router>
        );
    }
}

export default App;