import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import DriversActions from '../../actions/DriversActions.js';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

class EditCompany extends Component {

    handleChange = name => event => { 
        this.props.onChange(name, event);
    }

    render() {      
        const { classes, driver, companies, onSaveButtonClick } = this.props;
           
        return (
           <div className={classes.form} >  
                <div className={classes.container} >
                    <TextField
                        required
                        fullWidth
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
                     <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="age-simple">Select company</InputLabel>
                        <Select
                            displayEmpty
                            value={driver.get("CompanyId")}
                            onChange={this.handleChange('CompanyId')}
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

EditCompany.propTypes = {
    classes: PropTypes.object.isRequired,
    driver: PropTypes.instanceOf(Immutable.Map),
    driverId: PropTypes.string.isRequired,
    companies: PropTypes.instanceOf(Immutable.List),
    onChange: PropTypes.func.isRequired,
    onSaveButtonClick: PropTypes.func.isRequired,
};

EditCompany.defaultProps = {
    driverId: '',
    driver: Immutable.Map({
        Id: '',
        Name: '',
        Email: '',
        Address: '',
        Telephone: '',
    }),
    companies: Immutable.List(),
};

export default withStyles(styles)(EditCompany);