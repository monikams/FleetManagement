import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import { isFieldValid, isButtonDisabled } from '../../utils/validation.js';
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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

class EditDriver extends Component {

    handleChange = name => event => { 
        this.props.onChange(name, event);
    }

    render() {      
        const { classes, driver, onSaveButtonClick, isValid } = this.props;
           
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
                        value={driver.get("Name")}
                        id="name"
                        label="Name"
                        placeholder="Edit driver`s name"
                        className={classes.textField}          
                        onChange={this.handleChange('Name')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('Email',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={driver.get("Email")}
                        id="email"
                        label="Email"
                        placeholder="Edit driver`s email"
                        className={classes.textField}          
                        onChange={this.handleChange('Email')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('Address',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={driver.get("Address")}
                        id="address"
                        label="Address"
                        placeholder="Edit driver`s address"
                        className={classes.textField}         
                        onChange={this.handleChange('Address')}
                        margin="normal"
                    />
                     <TextField
                        fullWidth
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={driver.get("Telephone")}
                        id="phone"
                        label="Phone"
                        placeholder="Edit driver`s phone number"
                        className={classes.textField}         
                        onChange={this.handleChange('Telephone')}
                        margin="normal"
                    />      
                </div>
                <div className={classes.container} >
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="primary" 
                        className={classes.button}
                        onClick={onSaveButtonClick}
                        id='saveButton'
                        disabled={isButtonDisabled(omit(driver.toJS(), ["Telephone", "Id"]))}
                    >
                        Save
                    </Button>
                </div>
            </div>           
        );
    }
}

EditDriver.propTypes = {
    classes: PropTypes.object.isRequired,
    driver: PropTypes.instanceOf(Immutable.Map),
    driverId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSaveButtonClick: PropTypes.func.isRequired,
    isValid: PropTypes.array.isRequired,
};

EditDriver.defaultProps = {
    driverId: '',
    driver: Immutable.Map({
        Id: '',
        Name: '',
        Email: '',
        Address: '',
        Telephone: '',
    }),
};

export default withStyles(styles)(EditDriver);