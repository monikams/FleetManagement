import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import DriversActions from '../../actions/DriversActions.js';
import DriversStore from '../../stores/DriversStore';
import EditDriver from './EditDriver';
import connectToStores from 'alt-utils/lib/connectToStores';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';

class EditDriverContainer extends Component {

     constructor(props) {
        super(props);
        this.state = {
            localDriver: Immutable.Map({
                Id: '',
                Name: '',
                Email: '',
                Address: '',
                Telephone: '',
            }),
            isValid: {
                    'Name': true,
                    'Email': true,
                    'Address': true,
                    'ValidEmail': true,
                    'ValidPhone': true,
                },
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

    componentWillReceiveProps = nextProps => {
        if (this.props.driver !== nextProps.driver) {
          const driver = nextProps.driver;
          const localDriver = Immutable.Map({
                Id: driver.get('Id'),
                Name: driver.get('Name'),
                Email: driver.get('Email'),
                Address: driver.get('Address'),
                Telephone: driver.get('Telephone'),
                CompanyId: driver.get('CompanyId'),
            });
          this.setState({ localDriver });
        }
    }

    handleSaveButtonClick = () => {
        const driver = this.props.driver.get('driver');
        const { localDriver } = this.state;
        DriversActions.editDriver(localDriver);
    }

    handleChange = (name, event) => {
        const { target: { value }} = event;  
        const { localDriver, isValid } = this.state;  
        isValid[name] = !isEmpty(value); 
        const updatedDriver = localDriver.update(name, oldValue => value);
        this.setState({ 
            localDriver: updatedDriver,
            isValid: isValid 
        });
    };

    handleBlur = (name, event) => {
        const { target: { value }} = event;     
        const { localDriver, isValid } = this.state;
        const emailRegExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneRegExpression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        let updatedDriver;
        if (name === 'ValidEmail') {
            isValid[name] = emailRegExpression.test(String(value).toLowerCase());           
        } else if (name === 'ValidPhone') {
            isValid[name] = phoneRegExpression.test(String(value).toLowerCase());
        }  

         if (!isValid[name]) {
            updatedDriver = localDriver.update(name, oldValue => '');
        } else {
            updatedDriver = localDriver.update(name, oldValue => value); 
        }

        this.setState({ localDriver: updatedDriver });
    };
    
    render() {      
        const { classes, params: { driverId  } } = this.props;
        const { localDriver, isValid } = this.state;
        
        return (
            <EditDriver
                driver={localDriver}
                driverId={driverId}
                onSaveButtonClick={this.handleSaveButtonClick}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                isValid={isValid}
            />
        );
    }
}

EditDriverContainer.propTypes = {
    driver: PropTypes.instanceOf(Immutable.Map),
    params: PropTypes.object.isRequired,
};

EditDriverContainer.defaultProps = {
    driver: Immutable.Map({
        Id: '',
        Name: '',
        Email: '',
        Address: '',
        Telephone: '',
    }),
};

export default withRouter(connectToStores(EditDriverContainer));