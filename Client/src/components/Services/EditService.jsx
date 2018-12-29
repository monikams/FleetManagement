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

    render() {      
        const { classes, service, onSaveButtonClick, onRadioButtonChange } = this.props;

        return (
           <div className={classes.form} >  
                <div className={classes.container} >
                    <TextField
                        required
                        fullWidth
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
                        fullWidth
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
                            <FormControlLabel value="0" onChange={this.handleChange('BasedOn')} checked={service.get('BasedOn') == 0} control={<Radio />} label="Time" />
                            <FormControlLabel value="1" onChange={this.handleChange('BasedOn')} checked={service.get('BasedOn') == 1} control={<Radio />} label="Mileage" />
                        </div>
                    </div>
                    {service.get('BasedOn') == 1 &&
                        <div>
                            <TextField
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="mileageRule"
                                label="Mileage Rule"
                                value={service.get('MileageRule')}
                                placeholder="Enter service`s mileage rule as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('MileageRule')}
                                margin="normal"
                            />
                            <TextField
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="mileageReminder"
                                label="Mileage Reminder"
                                value={service.get('MileageReminder')}
                                placeholder="Enter service`s mileage reminder as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('MileageReminder')}
                                margin="normal"
                            />
                        </div>
                    }
                    {service.get('BasedOn') == 0 &&
                        <div>
                            <TextField
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="timeRule"
                                label="Time Rule"
                                value={service.get('TimeRule')}
                                placeholder="Enter service`s time rule as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('TimeRule')}
                                margin="normal"
                            />
                            <FormControl className={classes.formControl} >
                                <InputLabel shrink>Time Rule Range</InputLabel>
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="timeReminder"
                                label="Time Reminder"
                                value={service.get('TimeReminder')}
                                placeholder="Enter service`s time reminder as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('TimeReminder')}
                                margin="normal"
                            />
                            <FormControl className={classes.formControl} >
                                <InputLabel shrink>Time Reminder Range</InputLabel>
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
    onSaveButtonClick: PropTypes.func.isRequired,
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