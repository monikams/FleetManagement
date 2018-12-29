import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import { withStyles } from '@material-ui/core/styles';
import ServicesActions from '../../actions/ServicesActions.js';
import ServicesStore from '../../stores/ServicesStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import Input from '@material-ui/core/Input';
import EditService from './EditService';
import SideBar from '../SideBar';

const styles = theme => ({
   root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
});

class EditServiceContainer extends Component {

     constructor(props) {
        super(props);
        const { params: { vehicleId } } = this.props;
        this.state = {
            localService: Immutable.Map({
                Id: '',
                Name: '',
                Description: '',
                VehicleId: vehicleId,
                MileageRule: 0,
                MileageReminder: 0,
                TimeRule: 0,
                TimeRuleEntity: 1,
                TimeReminder: 0,
                TimeReminderEntity: 1,
            }),
		} 
    }

    static getStores() {
        return [ServicesStore];
    }

    static getPropsFromStores() {
        return {
            service: ServicesStore.getService(),           
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    componentWillMount() {
        const { params: { serviceId } } = this.props;
        ServicesActions.loadService(serviceId);
    }

    componentWillReceiveProps = nextProps => {
        if (this.props.service !== nextProps.service) {
          const service = nextProps.service;
          
          const localService = Immutable.Map({
                Id: service.get('Id'),
                Name: service.get('Name'),
                Description: service.get('Description'),
                VehicleId: service.get('VehicleId'),
                BasedOn: service.get('BasedOn'),
                MileageRule: service.get('MileageRule'),
                MileageReminder: service.get('MileageReminder'),
                TimeRule: service.get('TimeRule'),
                TimeRuleEntity: service.get('TimeRuleEntity'),
                TimeReminder: service.get('TimeReminder'),
                TimeReminderEntity: service.get('TimeReminderEntity'),
            });
          this.setState({ localService });
        }
    }

    componentWillUnmount() { 
        ServicesActions.unloadService();
    }

    handleSaveButtonClick = () => {
       const { localService } = this.state;
       const { params: { companyId } } = this.props;
       ServicesActions.editService(localService, companyId);
    }

    handleChange = (name, event) => {
        const { target: { value }} = event; 
        const { localService } = this.state;  
        const updatedService = localService.update(name, oldValue => value);
        this.setState({ localService: updatedService });
    };

    handleRadioButtonChange = (name, event) => {
        const { target: { value }} = event; 
        const { localService } = this.state;
        const updatedService = Immutable.Map({ 
            Id: localService.get('Id'),
            Name: localService.get('Name'), 
            VehicleId: localService.get('VehicleId'),
            BasedOn: value,
            MileageRule: '',
            MileageReminder: '',
            TimeRule: '',
            TimeRuleEntity: 1,
            TimeReminder: '',
            TimeReminderEntity: 1,
        });
        this.setState({ localService: updatedService });
    };


    render() {      
        const { service, classes } = this.props;
        const { localService } = this.state;
        
        return (
            <div className={classes.root} >
                <EditService
                    service={localService}
                    onSaveButtonClick={this.handleSaveButtonClick}
                    onChange={this.handleChange}
                    onRadioButtonChange={this.handleRadioButtonChange}
                />
            </div>    
        );
    }
}

EditServiceContainer.propTypes = {
    service: PropTypes.instanceOf(Immutable.Map),
    params: PropTypes.object.isRequired,
};

EditServiceContainer.defaultProps = {
    service: Immutable.Map({
        Id: '',
        Name: '',
        Description: '',
        BasedOn: '',
        MileageRule: 0,
        MileageReminder: 0,
        TimeRule: 0,
        TimeRuleEntity: 1,
        TimeReminder: 0,
        TimeReminderEntity: 1,
    }),
};

export default withStyles(styles)(connectToStores(EditServiceContainer));
