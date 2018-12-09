import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import CompaniesStore from '../../stores/CompaniesStore';
import CompaniesActions from '../../actions/CompaniesActions.js';
import DriversActions from '../../actions/DriversActions.js';
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
    width: '566.375px',
  },
});

class CreateDriverContainer extends Component {

     constructor(props) {
        super(props);
        this.state = {
			localDriver: {
                name: '',
                email: '',
                address: '',
                telephone: '',
                companyId: '',
            },
		} 
    }

    static getStores() {
        return [CompaniesStore];
    }

    static getPropsFromStores() {
        return {
            companies: CompaniesStore.getCompanies(),           
        }
    }

    componentWillMount() {
        CompaniesActions.loadCompanies();
    }

    handleChange = name => event => {
        const { target: { value }} = event;     
        const { localDriver } = this.state;
        const newDriver = merge(localDriver, { [name]: value });
        this.setState({ localDriver: newDriver });
    };

    handleSaveButtonClick = () => {
        const { localDriver } = this.state;   
        DriversActions.createDriver(localDriver);
    }

    render() {      
        const { classes, companies } = this.props;
        const { localDriver } = this.state;
    
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
                        placeholder="Enter driver`s name"
                        className={classes.textField}          
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="email"
                        label="Email"
                        placeholder="Enter driver`s email"
                        className={classes.textField}          
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="address"
                        label="Address"
                        placeholder="Enter driver`s address"
                        className={classes.textField}         
                        onChange={this.handleChange('address')}
                        margin="normal"
                    />
                     <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="phone"
                        label="Phone"
                        placeholder="Enter driver`s phone number"
                        className={classes.textField}         
                        onChange={this.handleChange('telephone')}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel required shrink htmlFor="age-simple">Select company</InputLabel>
                        <Select
                            displayEmpty
                            value={localDriver.companyId}
                            onChange={this.handleChange('companyId')}
                        >
                            {companies.map(company => (
                                <MenuItem key={company.Id} value={company.Id}>{company.Name}</MenuItem>
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

CreateDriverContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    companies: PropTypes.instanceOf(Immutable.Iterable),
};

CreateDriverContainer.defaultProps = {
   companies: Immutable.List(),
};

export default withStyles(styles)(connectToStores(CreateDriverContainer));