import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import UsersActions from '../../actions/UsersActions.js';
import CompaniesActions from '../../actions/CompaniesActions.js';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
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
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  form: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
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

class EditCompany extends Component {

    handleChange = name => event => { 
        this.props.onChange(name, event);
    }

    render() {      
        const { users, classes, company, onDropownChange, onSaveButtonClick, isValid } = this.props;

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
                        value={company.get("Name")}
                        id="name"
                        label="Name"
                        placeholder="Edit company`s name"
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
                        value={company.get("Email")}
                        id="email"
                        label="Email"
                        placeholder="Edit company`s email"
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
                        value={company.get("Address")}
                        id="address"
                        label="Address"
                        placeholder="Edit company`s address"
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
                        value={company.get("Telephone")}
                        id="phone"
                        label="Phone"
                        placeholder="Edit company`s phone number"
                        className={classes.textField}         
                        onChange={this.handleChange('Telephone')}
                        margin="normal"
                    />
                    {company.get("CreatorId") === localStorage.getItem('userId') &&
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-users">Allow access to users</InputLabel>
                            <Select
                                fullWidth
                                className={classes.select}
                                value={company.get("Subscribers") !== undefined ? company.get("Subscribers").map(u => u.UserName) : []}
                                onChange={onDropownChange}
                                renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                                )}
                            >
                                {users.map(user => (
                                <MenuItem key={user.Id} value={user.UserName}>
                                    <Checkbox checked={company.get("Subscribers") !== undefined ? company.get("Subscribers").map(u => u.UserName).indexOf(user.UserName) > -1 : false} />
                                    <ListItemText primary={user.UserName} />
                                </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                        disabled={isButtonDisabled(omit(company.toJS(), ["CreatorId", "Id"]))}
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
    users: PropTypes.instanceOf(Immutable.Iterable),
    company: PropTypes.instanceOf(Immutable.Map),
    companyId: PropTypes.string.isRequired,
    onDropownChange: PropTypes.func.isRequired, 
    onChange: PropTypes.func.isRequired,
    onSaveButtonClick: PropTypes.func.isRequired,
    isValid: PropTypes.array.isRequired,
};

EditCompany.defaultProps = {
    users: Immutable.List(),
    companyId: '',
    company: Immutable.Map({
        Id: '',
        CreatorId: '',
        Name: '',
        Email: '',
        Address: '',
        Telephone: '',
        Subscribers: Immutable.List(),
        Creator: {},
    }),
};

export default withStyles(styles)(EditCompany);