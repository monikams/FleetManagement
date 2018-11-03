import React, { Component } from 'react';
import './styles/App.css';
import { Router, Route, browserHistory } from 'react-router';
import Companies from './components/Companies.jsx';
import RegistrationContainer from './components/RegistrationContainer.jsx';

class App extends Component {
    render() {
        return (       
            <Router history={browserHistory}>
                <Route path='/register' component={RegistrationContainer} />          
				<Route path='/companies' component={Companies} />							
			</Router>
        );
    }
}

export default App;