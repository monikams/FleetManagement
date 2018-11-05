import React, { Component } from 'react';
import './styles/App.css';
import { Router, Route, browserHistory } from 'react-router';
import Companies from './components/Companies.jsx';
import AuthorizationContainer from './components/Authorization/AuthorizationContainer.jsx';
import RegistrationContainer from './components/Authorization/RegistrationContainer.jsx';
import LoginContainer from './components/Authorization/LoginContainer.jsx';

class App extends Component {
    render() {
        return (       
            <Router history={browserHistory}>
                <Route path='/' component={AuthorizationContainer} />          
				<Route path='/companies' component={Companies} />							
			</Router>
        );
    }
}

export default App;