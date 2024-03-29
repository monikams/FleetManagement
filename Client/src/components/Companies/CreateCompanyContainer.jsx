import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import UsersStore from '../../stores/UsersStore';
import UsersActions from '../../actions/UsersActions.js';
import CompaniesActions from '../../actions/CompaniesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
import { isFieldValid, isButtonDisabled } from '../../utils/validation.js';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import SideBar from '../SideBar';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextfieldValidationMessage from '../common/TextfieldValidationMessage.jsx';
import { setSideBarItem } from '../../utils/authorized-requests.js';

const styles = theme => ({
   root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
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
    marginTop: '30px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formControl: {
    marginTop: '16px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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

class CreateCompanyContainer extends Component {

     constructor(props) {
        super(props);
        this.state = {
			localCompany: {
                name: '',
                email: '',
                address: '',
                telephone: '',
                subscribers: [],
            },
               isValid: {
                'name': true,
                'email': true,
                'address': true,
                'validEmail': true,
                'validPhone': true,
            },
            isSaveButtonDisabled: false,
		} 
    }

    static getStores() {
        return [UsersStore];
    }

    static getPropsFromStores() {
        return {
            users: UsersStore.getUsers(),           
        }
    }

    componentWillMount() {
        UsersActions.loadUsers();
        setSideBarItem('companies');
    }

    handleChange = name => event => {
        const { target: { value }} = event;     
        const { localCompany, isValid } = this.state;
        const newCompany = merge(localCompany, { [name]: value });
        isValid[name] = !isEmpty(value);
        this.setState({ 
            localCompany: newCompany, 
            isValid: isValid
        });
    };

    handleBlur = name => event => {
        const { target: { value }} = event;     
        const { localUser, isValid } = this.state;
        const emailRegExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneRegExpression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        let newUser;
        if (name === 'validEmail') {
            isValid[name] = emailRegExpression.test(String(value).toLowerCase());           
        } else if (name === 'validPhone') {
            isValid[name] = phoneRegExpression.test(String(value).toLowerCase());
        }  

         if (!isValid[name]) {
            newUser = merge(localUser, { [name]: '' });    
        } else {
            newUser = merge(localUser, { [name]: value }); 
        }

        this.setState({ localUser: newUser });
    };

    handleSaveButtonClick = () => {
        const { localCompany, localCompany: { subscribers } } = this.state;
        const { users } = this.props;
        const selectedUsers = subscribers.map(name => users.filter(user => user.UserName === name)).map(user => user.first());    
        const newLocalCompany = merge(localCompany, { subscribers: selectedUsers });
        CompaniesActions.createCompany(newLocalCompany);
        this.setState({ isSaveButtonDisabled: true });
    }

     handleUserDropdownChange = event => {
        const { localCompany, localCompany: { subscribers } } = this.state;
        const { target: { value } } = event;

        const index = subscribers.findIndex(name => name === value);
        if (index === -1) {
            subscribers.push(value); 
        } else {
            subscribers.splice(index, 1);
        }

        const newCompany = merge(localCompany, { subscribers });
        this.setState({ localCompany: newCompany });
     };

     handleItemClick = (event) => {
        const { target : { textContent } } = event;
        this.props.router.push(`/companies`);
    }

    render() {      
        const { users, classes } = this.props;
        const { localCompany, localCompany : { subscribers }, isValid, isSaveButtonDisabled } = this.state;
        const items = ['Companies'];
    
        return (
            <div className={classes.root} >
                <SideBar id='createCompanySidebar' items={items} onItemClick={this.handleItemClick} />
                <div className={classes.form} >  
                    <div className={classes.container} >
                        <TextField
                            required
                            fullWidth
                            error={!isFieldValid('name',isValid)}
                            autoComplete="off"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            id="name"
                            label="Name"
                            placeholder="Enter company`s name"
                            className={classes.textField}          
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            required
                            fullWidth
                            error={!isFieldValid('email',isValid) || !isFieldValid('validEmail',isValid)}
                            autoComplete="off"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            id="email"
                            label="Email"
                            placeholder="Enter company`s email"
                            className={classes.textField}          
                            onChange={this.handleChange('email')}
                            onBlur={this.handleBlur('validEmail')}
                            margin="normal"
                        />
                        {!isValid['validEmail'] && <TextfieldValidationMessage message="Please enter a valid email!" />}
                        <TextField
                            required
                            fullWidth
                            error={!isFieldValid('address',isValid)}
                            autoComplete="off"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            id="address"
                            label="Address"
                            placeholder="Enter company`s address"
                            className={classes.textField}         
                            onChange={this.handleChange('address')}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            error={!isFieldValid('validPhone',isValid)}
                            autoComplete="off"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            id="phone"
                            label="Phone"
                            placeholder="Enter company`s phone number"
                            className={classes.textField}         
                            onChange={this.handleChange('telephone')}
                            onBlur={this.handleBlur('validPhone')}
                            margin="normal"
                        />
                        {!isValid['validPhone'] && <TextfieldValidationMessage message="Please enter a valid phone number!" />}
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink>Allow access to users</InputLabel>
                            <Select
                                fullWidth
                                autoComplete="off"
                                className={classes.select}
                                value={subscribers}
                                input={<Input id="select-multiple-chip" />}
                                onChange={this.handleUserDropdownChange}
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
                                    <Checkbox checked={subscribers.indexOf(user.UserName) > -1} />
                                    <ListItemText primary={user.UserName} />
                                </MenuItem>
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
                            disabled={isButtonDisabled(omit(localCompany, ['subscribers','telephone'])) || !isValid['validPhone'] || isSaveButtonDisabled}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>  
        );
    }
}

CreateCompanyContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.instanceOf(Immutable.Iterable),
};

CreateCompanyContainer.defaultProps = {
   users: Immutable.List(),
};

export default withStyles(styles)(connectToStores(CreateCompanyContainer));