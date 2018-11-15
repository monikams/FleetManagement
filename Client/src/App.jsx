import React, { Component } from 'react';
import './styles/App.css';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import Companies from './components/Companies.jsx';
import AuthorizationContainer from './components/Authorization/AuthorizationContainer.jsx';
import RegistrationContainer from './components/Authorization/RegistrationContainer.jsx';
import LoginContainer from './components/Authorization/LoginContainer.jsx';
import { isLoggedIn } from './utils/authorized-requests.js';
import AppBar from './components/AppBar.jsx';

class App extends Component {
    render() {
        return (       
            <Router history={browserHistory}>     
                    <Route path='/' component={AuthorizationContainer} /> 
                    <Router history={browserHistory}>
                        <Route path='/' component={AppBar} >
                            <Route path='companies' component={Companies} />
                            <Route path='drivers' component={Companies} />
                        </Route>    
                   </Router>                                						
			</Router>
        );
    }
}

export default App;