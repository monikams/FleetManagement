import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import CompaniesStore from '../../stores/CompaniesStore';
import CompaniesActions from '../../actions/CompaniesActions.js';
import DriversStore from '../../stores/DriversStore';
import DriversActions from '../../actions/DriversActions.js';
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
        const { params: { companyId } } = props;
        super(props);
        this.state = {
			localService: {
                vin: '',
                plateNumber: '',
                type: '',
                brand: '',
                model: '',
                companyId: companyId,
                driverId: '',
            },
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
        const { localService } = this.state;
        const newService = merge(localService, { [name]: value });
        this.setState({ localService: newService });
    };

    handleSaveButtonClick = () => {
        const { localService } = this.state;   
        ServicesActions.createService(localService);
    }

    render() {      
        const { classes, companies, drivers } = this.props;
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
                        id="VIN"
                        label="VIN"
                        placeholder="Enter Service`s VIN"
                        className={classes.textField}          
                        onChange={this.handleChange('VIN')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="plateNumber"
                        label="Plate Number"
                        placeholder="Enter Service`s plate number"
                        className={classes.textField}          
                        onChange={this.handleChange('plateNumber')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="type"
                        label="Type"
                        placeholder="Enter Service`s type"
                        className={classes.textField}         
                        onChange={this.handleChange('type')}
                        margin="normal"
                    />
                     <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="brand"
                        label="Brand"
                        placeholder="Enter Service`s brand"
                        className={classes.textField}         
                        onChange={this.handleChange('brand')}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="model"
                        label="Model"
                        placeholder="Enter Service`s model"
                        className={classes.textField}         
                        onChange={this.handleChange('model')}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl} >
                        <InputLabel shrink>Select driver</InputLabel>
                        <Select
                            displayEmpty
                            value={localService.driverId}
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

export default withStyles(styles)(connectToStores(CreateServiceContainer));