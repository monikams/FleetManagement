import React, { Component } from 'react';
import './styles/App.css';
import Companies from './components/Companies.jsx';

class App extends Component {
    render() {
        return (
            <div className="App">               
                <div className="container">                  
                    <Companies />                   
                </div>
            </div>
        );
    }
}

export default App;