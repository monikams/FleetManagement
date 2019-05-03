import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import ServicesStore from '../../stores/ServicesStore';
import ServicesActions from '../../actions/ServicesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
import { isFieldValid, isCreateServicesSaveButtonDisabled } from '../../utils/validation.js';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextfieldValidationMessage from '../common/TextfieldValidationMessage.jsx';

const styles = theme => ({
  button: {
    marginTop: '20px',
    width: '112px',
    height: '40px',
  },
  container: {
    width: '75%',
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  form: {
    width: '50%',
    margin: 'auto',
    display: 'grid',
    marginTop: '30px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '16px',
    width: '100%',
  },
  radioButtonsLabel: {
    marginTop: '16px',
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: `0.8rem`,
    fontFamily: "Roboto Helvetica Arial, sans-serif",
    lineHeight: 1,
  }
});

class CreateServiceContainer extends Component {

     constructor(props) {
        const { params: { vehicleId } } = props;
        super(props);
        this.state = {
			localService: {
                name: '',
                description: '',
                recipient: '',
                vehicleId: vehicleId,
                basedOn: '',
                mileageRule: '',
                mileageReminder: '',
                timeRule: '',
                timeRuleEntity: 1,
                timeReminder: '',
                timeReminderEntity: 1,
            },
            isValid: {
                'name': true,
                'recipient': true,
                'mileageRule': true,
                'mileageReminder': true,
                'timeRule': true,
                'timeRuleEntity': true,
                'timeReminder': true,
                'timeReminderEntity': true,
                'validRecipient': true,
                'validTimeReminder': true,
                'validTimeRule': true,
                'validMileageReminder': true,
                'validMileageRule': true,
            },
            isSaveButtonDisabled: false,
		}
    }

    handleChange = name => event => {
        const { target: { value }} = event; 
        const { localService, isValid } = this.state;
        isValid[name] = !isEmpty(value);
        const newService = merge(localService, { [name]: value });
        this.setState({ 
            localService: newService,
            isValid: isValid
        });
    };

     handleBlur = name => event => {
        const { target: { value }} = event;     
        const { localService, isValid } = this.state;
        const emailRegExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;   

        let newService;
        if (name === 'validRecipient') {
            isValid[name] = emailRegExpression.test(String(value).toLowerCase());           
        } else {
            isValid[name] = value >= 0;
        }

        if (!isValid[name]) {
            newService = merge(localService, { [name]: '' });    
        } else {
            newService = merge(localService, { [name]: value }); 
        }

        this.setState({ localService: newService });
    };

    handleRadioButtonChange = event => {
        const { target: { value }} = event; 
        const { localService, isValid } = this.state;
        const isValidRecipient = isValid['ValidRecipient'];

        const newService = merge({}, { 
            name: localService.name, 
            description: localService.description,
            recipient: localService.recipient, 
            vehicleId: localService.vehicleId,
            basedOn: value === 'time' ? 0 : 1,
            mileageRule: '',
            mileageReminder: '',
            timeRule: '',
            timeRuleEntity: 1,
            timeReminder: '',
            timeReminderEntity: 1,
        });
        this.setState({ 
            localService: newService,
            isValid: {
                'name': true,
                'recipient': true,
                'mileageRule': true,
                'mileageReminder': true,
                'timeRule': true,
                'timeRuleEntity': true,
                'timeReminder': true,
                'timeReminderEntity': true,
                'validRecipient': isValidRecipient,
                'validTimeReminder': true,
                'validTimeRule': true,
                'validMileageReminder': true,
                'validMileageRule': true,
            }
        })
    };

    handleSaveButtonClick = () => {
        const { localService } = this.state;
        const { params: { companyId } } = this.props;
        ServicesActions.createService(localService, companyId);
        this.setState({ isSaveButtonDisabled: true });
    }

    render() {      
        const { classes } = this.props;
        const { localService, selectedValue, isValid, isSaveButtonDisabled } = this.state;
    
        return (
            <div className={classes.form} >  
                <div className={classes.container} >
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('name',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="name"
                        label="Name"
                        placeholder="Enter service`s name"
                        className={classes.textField}          
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                     <TextField
                        required
                        fullWidth
                        error={!isFieldValid('recipient',isValid) || !isFieldValid('validRecipient',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="recipient"
                        label="Notifications recipient"
                        placeholder="Enter a valid email"
                        className={classes.textField}          
                        onChange={this.handleChange('recipient')}
                        onBlur={this.handleBlur('validRecipient')}
                        margin="normal"
                    />
                     {!isValid['validRecipient'] && <TextfieldValidationMessage message="Please enter a valid email!" />}
                    <TextField
                        fullWidth
                        multiline
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="description"
                        label="Description"
                        placeholder="Enter service`s description"
                        className={classes.textField}          
                        onChange={this.handleChange('description')}
                        margin="normal"
                    />
                    <div className={classes.textField} >
                        <p className={classes.radioButtonsLabel} >Select time-based or mileage-based notifications *</p>
                        <div>
                            <FormControlLabel value="time" onChange={this.handleRadioButtonChange} checked={localService.basedOn === 0} control={<Radio />} label="Time" />
                            <FormControlLabel value="mileage" onChange={this.handleRadioButtonChange} checked={localService.basedOn === 1} control={<Radio />} label="Mileage" />
                        </div>
                    </div>
                    {localService.basedOn === 1 &&
                        <div>
                            <TextField
                                required
                                fullWidth
                                error={!isFieldValid('mileageRule',isValid) || !isFieldValid('validMileageRule',isValid)}
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="mileageRule"
                                label="Mileage Rule"
                                placeholder="Enter service`s mileage rule as a positive integer"
                                className={classes.textField}         
                                onChange={this.handleChange('mileageRule')}
                                onBlur={this.handleBlur('validMileageRule')}
                                margin="normal"
                            />
                            {!isValid['validMileageRule'] && <TextfieldValidationMessage message="Please enter a positive mileage rule!" />}
                            <TextField
                                required
                                fullWidth
                                error={!isFieldValid('mileageReminder',isValid) || !isFieldValid('validMileageReminder',isValid)}
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="mileageReminder"
                                label="Mileage Reminder"
                                placeholder="Enter service`s mileage reminder as a positive integer"
                                className={classes.textField}         
                                onChange={this.handleChange('mileageReminder')}
                                onBlur={this.handleBlur('validMileageReminder')}
                                margin="normal"
                            />
                            {!isValid['validMileageReminder'] && <TextfieldValidationMessage message="Please enter a positive mileage reminder!" />}
                        </div>
                    }
                    {localService.basedOn === 0 &&
                        <div>
                            <TextField
                                required
                                fullWidth
                                error={!isFieldValid('timeRule',isValid) || !isFieldValid('validTimeRule',isValid)}
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="timeRule"
                                label="Time Rule"
                                placeholder="Enter service`s time rule as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('timeRule')}
                                onBlur={this.handleBlur('validTimeRule')}
                                margin="normal"
                            />
                            {!isValid['validTimeRule'] && <TextfieldValidationMessage message="Please enter a positive time rule!" />}
                            <FormControl className={classes.formControl} >
                                <InputLabel shrink>Time Rule Unit</InputLabel>
                                <Select
                                    displayEmpty
                                    value={localService.timeRuleEntity}
                                    onChange={this.handleChange('timeRuleEntity')}
                                >  
                                    <MenuItem key={1} value={1}>Days</MenuItem>
                                    <MenuItem key={2} value={2}>Months</MenuItem>
                                    <MenuItem key={3} value={3}>Years</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                fullWidth
                                error={!isFieldValid('timeReminder',isValid) || !isFieldValid('validTimeReminder',isValid)}
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="timeReminder"
                                label="Time Reminder"
                                placeholder="Enter service`s time reminder as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('timeReminder')}
                                onBlur={this.handleBlur('validTimeReminder')}
                                margin="normal"
                            />
                            {!isValid['validTimeReminder'] && <TextfieldValidationMessage message="Please enter a positive time reminder!" />}
                            <FormControl className={classes.formControl} >
                                <InputLabel shrink>Time Reminder Unit</InputLabel>
                                <Select
                                    displayEmpty
                                    value={localService.timeReminderEntity}
                                    onChange={this.handleChange('timeReminderEntity')}
                                >  
                                    <MenuItem key={1} value={1}>Days</MenuItem>
                                    <MenuItem key={2} value={2}>Months</MenuItem>
                                    <MenuItem key={3} value={3}>Years</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    }  
                </div>
                <div className={classes.container} >
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.handleSaveButtonClick}
                        id='saveButton'
                        disabled={isCreateServicesSaveButtonDisabled(omit(localService, ['description','vehicleId'])) || isSaveButtonDisabled}
                    >
                        Save
                    </Button>
                </div>
            </div>  
        );
    }
}

CreateServiceContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CreateServiceContainer);