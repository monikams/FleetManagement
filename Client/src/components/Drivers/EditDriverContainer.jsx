import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import DriversActions from '../../actions/DriversActions.js';
import DriversStore from '../../stores/DriversStore';
import CompaniesStore from '../../stores/CompaniesStore';
import CompaniesActions from '../../actions/CompaniesActions.js';
import EditDriver from './EditDriver';
import connectToStores from 'alt-utils/lib/connectToStores';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';

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
            CompanyId: '',
        }),
	  } 
    }

    static getStores() {
        return [DriversStore, CompaniesStore];
    }

    static getPropsFromStores() {
        return {
            driver: DriversStore.getDriver(),
            companies: CompaniesStore.getCompanies(),           
        }
    }

   shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    componentWillMount() {
        const { params: { driverId } } = this.props;
        DriversActions.loadDriver(driverId);
        CompaniesActions.loadCompanies();
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
        const { localDriver } = this.state;   
        const updatedDriver = localDriver.update(name, oldValue => value);
        this.setState({ localDriver: updatedDriver });
    };
    
    render() {      
        const { classes, companies, driver, params: { driverId  } } = this.props;
        const { localDriver } = this.state;   
        
        return (
            <EditDriver
                driver={localDriver}
                companies={companies}
                driverId={driverId}
                onSaveButtonClick={this.handleSaveButtonClick}
                onChange={this.handleChange}
            />
        );
    }
}

EditDriverContainer.propTypes = {
    driver: PropTypes.instanceOf(Immutable.Map),
    companies: PropTypes.instanceOf(Immutable.List),
    params: PropTypes.object.isRequired,
};

EditDriverContainer.defaultProps = {
    driver: Immutable.Map({
        Id: '',
        Name: '',
        Email: '',
        Address: '',
        Telephone: '',
        CompanyId: '',
    }),
    companies: Immutable.List(),
};

export default connectToStores(EditDriverContainer);