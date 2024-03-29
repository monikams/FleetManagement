import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

class EditVehicle extends Component {

    handleChange = name => event => {
        this.props.onChange(name, event);
    }

    render() {      
        const { classes, vehicle, drivers, onSaveButtonClick, isValid } = this.props;
           
        return (
           <div className={classes.form} >  
                <div className={classes.container} >
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('VIN',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="VIN"
                        label="VIN"
                        value={vehicle.get("VIN")}
                        className={classes.textField}          
                        onChange={this.handleChange('VIN')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('PlateNumber',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="plateNumber"
                        label="Plate Number"
                        value={vehicle.get("PlateNumber")}
                        className={classes.textField}          
                        onChange={this.handleChange('PlateNumber')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('Type',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="type"
                        label="Type"
                        value={vehicle.get("Type")}
                        className={classes.textField}         
                        onChange={this.handleChange('Type')}
                        margin="normal"
                    />
                     <TextField
                        required
                        fullWidth
                        error={!isFieldValid('Brand',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="brand"
                        label="Brand"
                        value={vehicle.get("Brand")}
                        className={classes.textField}         
                        onChange={this.handleChange('Brand')}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="model"
                        label="Model"
                        value={vehicle.get("Model")}
                        className={classes.textField}         
                        onChange={this.handleChange('Model')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('ProductionYear',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="productionYear"
                        label="ProductionYear"
                        value={vehicle.get("ProductionYear")}
                        className={classes.textField}         
                        onChange={this.handleChange('ProductionYear')}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink>Select Driver</InputLabel>
                        <Select
                            displayEmpty
                            value={vehicle.get('DriverId')}
                            onChange={this.handleChange('DriverId')}
                        >
                            <MenuItem key='withoutDriver' value='withoutDriver' >No Driver</MenuItem>
                            {drivers.map(driver => (
                                <MenuItem key={driver.Id} value={driver.Id}>{driver.Name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>                
                </div>
                <div className={classes.container} >
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="primary" 
                        className={classes.button}
                        onClick={onSaveButtonClick}
                        id='saveButton'
                        disabled={isButtonDisabled(omit(vehicle.toJS(), ["Model", "Id", "DriverId", "CompanyId"]))}
                    >
                        Save
                    </Button>
                </div>
            </div>           
        );
    }
}

EditVehicle.propTypes = {
    classes: PropTypes.object.isRequired,
    vehicle: PropTypes.instanceOf(Immutable.Map),
    vehicleId: PropTypes.string.isRequired,
    drivers: PropTypes.instanceOf(Immutable.List),
    onChange: PropTypes.func.isRequired,
    onSaveButtonClick: PropTypes.func.isRequired,
    isValid: PropTypes.object.isRequired,
};

EditVehicle.defaultProps = {
    vehicleId: '',
    vehicle: Immutable.Map({
        Id: '',
        VIN: '',
        PlateNumber: '',
        Type: '',
        Brand: '',
        Model: '',
        ProductionYear: '',
        DriverId: '',
        CompanyId: '',
    }),
    drivers: Immutable.List(),
};

export default withStyles(styles)(EditVehicle);