import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import ServicesStore from '../../stores/ServicesStore';
import ServicesActions from '../../actions/ServicesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
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

class CreateServiceContainer extends Component {

     constructor(props) {
        const { params: { vehicleId } } = props;
        super(props);
        this.state = {
			localService: {
                name: '',
                description: '',
                vehicleId: vehicleId,
                basedOn: '',
                mileageRule: 0,
                mileageReminder: 0,
                timeRule: 0,
                timeRuleEntity: 1,
                timeReminder: 0,
                timeReminderEntity: 1,
            },
		}
    }

    handleChange = name => event => {
        const { target: { value }} = event; 
        const { localService } = this.state;
        const newService = merge(localService, { [name]: value });
        this.setState({ localService: newService });
    };

    handleRadioButtonChange = event => {
        const { target: { value }} = event; 
        const { localService } = this.state;
        const newService = merge({}, { 
            name: localService.name, 
            description: localService.description,
            vehicleId: localService.vehicleId,
            basedOn: value === 'time' ? 0 : 1,
            mileageRule: 0,
            mileageReminder: 0,
            timeRule: 0,
            timeRuleEntity: 1,
            timeReminder: 0,
            timeReminderEntity: 1,
        });
        this.setState({ localService: newService })
    };

    handleSaveButtonClick = () => {
        const { localService } = this.state;
        const { params: { companyId } } = this.props;
        ServicesActions.createService(localService, companyId);
    }

    render() {      
        const { classes } = this.props;
        const { localService, selectedValue } = this.state;
    
        return (
            <div className={classes.form} >  
                <div className={classes.container} >
                    <TextField
                        required
                        fullWidth
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
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="mileageRule"
                                label="Mileage Rule"
                                placeholder="Enter service`s mileage rule as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('mileageRule')}
                                margin="normal"
                            />
                            <TextField
                                required
                                fullWidth
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="mileageReminder"
                                label="Mileage Reminder"
                                placeholder="Enter service`s mileage reminder as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('mileageReminder')}
                                margin="normal"
                            />
                        </div>
                    }
                    {localService.basedOn === 0 &&
                        <div>
                            <TextField
                                required
                                fullWidth
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="timeRule"
                                label="Time Rule"
                                placeholder="Enter service`s time rule as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('timeRule')}
                                margin="normal"
                            />
                            <FormControl className={classes.formControl} >
                                <InputLabel shrink>Time Rule Range</InputLabel>
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
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="timeReminder"
                                label="Time Reminder"
                                placeholder="Enter service`s time reminder as an integer"
                                className={classes.textField}         
                                onChange={this.handleChange('timeReminder')}
                                margin="normal"
                            />
                            <FormControl className={classes.formControl} >
                                <InputLabel shrink>Time Reminder Range</InputLabel>
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