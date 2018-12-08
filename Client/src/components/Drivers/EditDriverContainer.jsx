import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import DriversActions from '../../actions/DriversActions.js';
import DriversStore from '../../stores/DriversStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import EditDriver from './EditDriver';

class EditDriverContainer extends Component {

     constructor(props) {
        super(props);
        this.state = {
		driver: Immutable.Map({
            Id: '',
            Name: '',
            Email: '',
            Address: '',
            Telephone: '',
        }),
	  } 
    }

    static getStores() {
        return [DriversStore];
    }

    static getPropsFromStores() {
        return {
            driver: DriversStore.getDriver(),           
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    componentWillMount() {
        const { params: { driverId } } = this.props;
        DriversActions.loadDriver(driverId);
    }

    componentWillUnmount() { 
        DriversActions.unloadDriver();
    }

    handleSaveButtonClick = () => {
        const driver = this.props.driver.get('driver');  
        const { localDriver } = this.state;

       if (localDriver === undefined) {
          this.props.router.push('drivers');
       } else {
          DriversActions.editDriver(localDriver);
       }
    }

    handleChange = (name, event) => {
        const { target: { value }} = event;  
        const { driver } = this.props;   
        const updatedDriver = driver.get('driver').update(name, oldValue => value);
        this.setState({ localDriver: updatedDriver });
    };
    
    render() {      
        const { classes, driver, params: { driverId  } } = this.props;
        const { localDriver } = this.state;   
        const doneLoading = driver.get('doneLoading');
        
        return (
            doneLoading ?
            <EditDriver
                driver={localDriver === undefined ? driver.get('driver') : localDriver}
                driverId={driverId}
                onSaveButtonClick={this.handleSaveButtonClick}
                onChange={this.handleChange}
            /> : null
        );
    }
}

EditDriverContainer.propTypes = {
    driver: PropTypes.instanceOf(Immutable.Map),
    params: PropTypes.object.isRequired,
};

EditDriverContainer.defaultProps = {
    driver: Immutable.Map({
        driver: Immutable.Map({
            Id: '',
            Name: '',
            Email: '',
            Address: '',
            Telephone: '',
        }),
        isLoading: true,
        doneLoading: false,
    }),
};

export default connectToStores(EditDriverContainer);