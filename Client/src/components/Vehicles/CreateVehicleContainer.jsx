import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import CompaniesStore from '../../stores/CompaniesStore';
import CompaniesActions from '../../actions/CompaniesActions.js';
import DriversStore from '../../stores/DriversStore';
import DriversActions from '../../actions/DriversActions.js';
import VehiclesActions from '../../actions/VehiclesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
import { isFieldValid, isButtonDisabled } from '../../utils/validation.js';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
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
});

class CreateVehicleContainer extends Component {

     constructor(props) {
        const { params: { companyId } } = props;
        super(props);
        this.state = {
			localVehicle: {
                VIN: '',
                plateNumber: '',
                type: '',
                brand: '',
                model: '',
                productionYear: true,
                companyId: companyId,
                driverId: '',
            },
            isValid: {
                'VIN': true,
                'plateNumber': true,
                'type': true,
                'brand': true,
                'productionYear': true,
            },
            isSaveButtonDisabled: false,
		} 
    }

    static getStores() {
        return [CompaniesStore, DriversStore];
    }

    static getPropsFromStores() {
        return {
            companies: CompaniesStore.getCompanies(),      
            drivers: DriversStore.getDrivers(),     
        }
    }

    componentWillMount() {
        const { params: { companyId } } = this.props;
        CompaniesActions.loadCompanies();
        DriversActions.loadDrivers(companyId);
    }

    handleChange = name => event => {
        const { target: { value }} = event;     
        const { localVehicle, isValid } = this.state;
        const newVehicle = merge(localVehicle, { [name]: value });
        isValid[name] = !isEmpty(value);
        this.setState({ 
            localVehicle: newVehicle,
            isValid: isValid,        
        });
    };

    handleSaveButtonClick = () => {
        const { localVehicle } = this.state;   
        VehiclesActions.createVehicle(localVehicle);
        this.setState({ isSaveButtonDisabled: true });
    }

    render() {      
        const { classes, companies, drivers } = this.props;
        const { localVehicle, isValid, isSaveButtonDisabled } = this.state;
    
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
                        placeholder="Enter vehicle`s VIN"
                        className={classes.textField}          
                        onChange={this.handleChange('VIN')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('plateNumber',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="plateNumber"
                        label="Plate Number"
                        placeholder="Enter vehicle`s plate number"
                        className={classes.textField}          
                        onChange={this.handleChange('plateNumber')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('type',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="type"
                        label="Type"
                        placeholder="Enter vehicle`s type"
                        className={classes.textField}         
                        onChange={this.handleChange('type')}
                        margin="normal"
                    />
                     <TextField
                        required
                        fullWidth
                        error={!isFieldValid('brand',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="brand"
                        label="Brand"
                        placeholder="Enter vehicle`s brand"
                        className={classes.textField}         
                        onChange={this.handleChange('brand')}
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
                        placeholder="Enter vehicle`s model"
                        className={classes.textField}         
                        onChange={this.handleChange('model')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        error={!isFieldValid('productionYear',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="productionYear"
                        label="Production year"
                        placeholder="Enter vehicle`s production year"
                        className={classes.textField}         
                        onChange={this.handleChange('productionYear')}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl} >
                        <InputLabel shrink>Select Driver</InputLabel>
                        <Select
                            displayEmpty
                            value={localVehicle.driverId}
                            onChange={this.handleChange('driverId')}
                        >
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
                        onClick={this.handleSaveButtonClick}
                        id='saveButton'
                        disabled={isButtonDisabled(omit(localVehicle, ['driverId','model'])) || isSaveButtonDisabled}
                    >
                        Save
                    </Button>
                </div>
            </div>  
        );
    }
}

CreateVehicleContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    companies: PropTypes.instanceOf(Immutable.Iterable),
};

CreateVehicleContainer.defaultProps = {
   companies: Immutable.List(),
};

export default withStyles(styles)(connectToStores(CreateVehicleContainer));