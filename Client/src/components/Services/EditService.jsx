import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import ServicesActions from '../../actions/ServicesActions.js';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextfieldValidationMessage from '../common/TextfieldValidationMessage.jsx';
import { isFieldValid, isServicesSaveButtonDisabled } from '../../utils/validation.js';
import omit from 'lodash/omit'; 

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

class EditService extends Component {

    handleChange = name => event => { 
        this.props.onChange(name, event);
    }

    handleBlur = name => event => { 
        this.props.onBlur(name, event);
    }

    handleRadioButtonChange = name => event => {
        this.props.onRadioButtonChange(name, event);
    }

    render() {      
        const { classes, service, onSaveButtonClick, onRadioButtonChange, isValid } = this.props;

        return (
           <div className={classes.form} >  
                <div className={classes.container} >
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('Name',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="name"
                        label="Name"
                        value={service.get('Name')}
                        placeholder="Enter service`s name"
                        className={classes.textField}          
                        onChange={this.handleChange('Name')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('Recipient',isValid) || !isFieldValid('ValidRecipient',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="recipient"
                        label="Notifications recipient"
                        value={service.get('Recipient')}
                        placeholder="Enter a valid email"
                        className={classes.textField}          
                        onChange={this.handleChange('Recipient')}
                        onBlur={this.handleBlur('ValidRecipient')}
                        margin="normal"
                    />
                    {!isValid['ValidRecipient'] && <TextfieldValidationMessage message="Please enter a valid email!" />}
                    <TextField
                        fullWidth
                        multiline
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="description"
                        label="Description"
                        value={service.get('Description')}
                        placeholder="Enter service`s description"
                        className={classes.textField}          
                        onChange={this.handleChange('Description')}
                        margin="normal"
                    />
                    <div className={classes.textField} >
                        <p className={classes.radioButtonsLabel} >Select time-based or mileage-based notifications *</p>
                        <div>
                            <FormControlLabel value="0" onChange={this.handleRadioButtonChange('BasedOn')} checked={service.get('BasedOn') == 0} control={<Radio />} label="Time" />
                            <FormControlLabel value="1" onChange={this.handleRadioButtonChange('BasedOn')} checked={service.get('BasedOn') == 1} control={<Radio />} label="Mileage" />
                        </div>
                    </div>
                    {service.get('BasedOn') == 1 &&
                        <div>
                            <TextField
                                required
                                fullWidth
                                error={!isFieldValid('MileageRule',isValid) || !isFieldValid('ValidMileageRule',isValid)}
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="mileageRule"
                                label="Mileage Rule"
                                value={service.get('MileageRule')}
                                placeholder="Enter service`s mileage rule as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('MileageRule')}
                                onBlur={this.handleBlur('ValidMileageRule')}
                                margin="normal"
                            />
                            {!isValid['ValidMileageRule'] && <TextfieldValidationMessage message="Please enter a positive mileage rule!" />}
                            <TextField
                                required
                                fullWidth
                                error={!isFieldValid('MileageReminder',isValid) || !isFieldValid('ValidMileageReminder',isValid)}
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="mileageReminder"
                                label="Mileage Reminder"
                                value={service.get('MileageReminder')}
                                placeholder="Enter service`s mileage reminder as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('MileageReminder')}
                                onBlur={this.handleBlur('ValidMileageReminder')}
                                margin="normal"
                            />
                            {!isValid['ValidMileageReminder'] && <TextfieldValidationMessage message="Please enter a positive mileage reminder!" />}
                        </div>
                    }
                    {service.get('BasedOn') == 0 &&
                        <div>
                            <TextField
                                required
                                fullWidth
                                error={!isFieldValid('TimeRule',isValid) || !isFieldValid('ValidTimeRule',isValid)}
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="timeRule"
                                label="Time Rule"
                                value={service.get('TimeRule')}
                                placeholder="Enter service`s time rule as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('TimeRule')}
                                onBlur={this.handleBlur('ValidTimeRule')}
                                margin="normal"
                            />
                            {!isValid['ValidTimeRule'] && <TextfieldValidationMessage message="Please enter a positive time rule!" />}
                            <FormControl className={classes.formControl} >
                                <InputLabel shrink>Time Rule Unit</InputLabel>
                                <Select
                                    displayEmpty
                                    value={service.get('TimeRuleEntity')}
                                    onChange={this.handleChange('TimeRuleEntity')}
                                >  
                                    <MenuItem key={1} value={1}>Days</MenuItem>
                                    <MenuItem key={2} value={2}>Months</MenuItem>
                                    <MenuItem key={3} value={3}>Years</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                fullWidth
                                error={!isFieldValid('TimeReminder',isValid) || !isFieldValid('ValidTimeReminder',isValid)}
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="timeReminder"
                                label="Time Reminder"
                                value={service.get('TimeReminder')}
                                placeholder="Enter service`s time reminder as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('TimeReminder')}
                                onBlur={this.handleBlur('ValidTimeReminder')}
                                margin="normal"
                            />
                            {!isValid['ValidTimeReminder'] && <TextfieldValidationMessage message="Please enter a positive time reminder!" />}
                            <FormControl className={classes.formControl} >
                                <InputLabel shrink>Time Reminder Unit</InputLabel>
                                <Select
                                    displayEmpty
                                    value={service.get('TimeReminderEntity')}
                                    onChange={this.handleChange('TimeReminderEntity')}
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
                        onClick={onSaveButtonClick}
                        id='saveButton'
                        disabled={isServicesSaveButtonDisabled(omit(service.toJS(), ['Description','VehicleId']))}
                    >
                        Save
                    </Button>
                </div>
            </div> 
        );
    }
}

EditService.propTypes = {
    classes: PropTypes.object.isRequired,
    service: PropTypes.instanceOf(Immutable.Map),
    onChange: PropTypes.func.isRequired,
    onRadioButtonChange: PropTypes.func.isRequired,
    onSaveButtonClick: PropTypes.func.isRequired,
    isValid: PropTypes.object.isRequired,
};

EditService.defaultProps = {
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

export default withStyles(styles)(EditService);