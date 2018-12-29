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
import ListItemText from '@material-ui/core/ListItemText';
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

    handleSaveButtonClick = () => {
        const { localService } = this.state;   
        //ServicesActions.createService(localService);
    }

    render() {      
        const { classes } = this.props;
        const { localService } = this.state;
    
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
                        placeholder="Enter service`s name"
                        className={classes.textField}          
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
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
                    <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="mileageRule"
                        label="Mileage Rule"
                        placeholder="Enter service`s mileage rule"
                        className={classes.textField}         
                        onChange={this.handleChange('mileageRule')}
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
                        placeholder="Enter service`s mileage reminder"
                        className={classes.textField}         
                        onChange={this.handleChange('mileageReminder')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="timeRule"
                        label="Time Rule"
                        placeholder="Enter service`s time rule"
                        className={classes.textField}         
                        onChange={this.handleChange('timeRule')}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl} >
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
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="timeReminder"
                        label="Time Reminder"
                        placeholder="Enter service`s time reminder"
                        className={classes.textField}         
                        onChange={this.handleChange('timeReminder')}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl} >
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
    companies: PropTypes.instanceOf(Immutable.Iterable),
};

CreateServiceContainer.defaultProps = {
   companies: Immutable.List(),
};

export default withStyles(styles)(CreateServiceContainer);