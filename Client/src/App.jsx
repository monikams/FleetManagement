import React, { Component } from 'react';
import './styles/App.css';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import Companies from './components/Companies.jsx';
import Drivers from './components/Drivers.jsx';
import AuthorizationContainer from './components/Authorization/AuthorizationContainer.jsx';
import RegistrationContainer from './components/Authorization/RegistrationContainer.jsx';
import LoginContainer from './components/Authorization/LoginContainer.jsx';
import Home from './components/Home.jsx';

class App extends Component {
    render() {
        return (       
            <Router history={browserHistory}>     
                    <Route path='/' component={AuthorizationContainer} /> 
                    <Route path='/' component={Home} >
                        <Route path='companies' component={Companies} />
                        <Route path='drivers' component={Drivers} />
                    </Route>                                        						
			</Router>
        );
    }
}

export default App;