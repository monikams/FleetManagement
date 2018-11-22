import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import UsersStore from '../stores/UsersStore';
import UsersActions from '../actions/UsersActions.js';
import CompaniesActions from '../actions/CompaniesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
  select: {
    marginTop: '16px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

class EditCompanyContainer extends Component {

     constructor(props) {
        super(props);
        this.state = {
			localCompany: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                selectedUsers: [],
            },
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

    componentDidMount() {
        UsersActions.loadUsers();
    }

    handleChange = name => event => {
        const { target: { value }} = event;     
        const { localCompany } = this.state;
        const newCompany = merge(localCompany, { [name]: value });
        this.setState({ localCompany: newCompany });
    };

    handleSaveButtonClick = () => {
        const { localCompany } = this.state;
        CompaniesActions.createCompany(localCompany);
    }

     handleUserDropdownChange = event => {
        const { localCompany, localCompany: { selectedUsers } } = this.state;
        const { target: { value } } = event;
        const index = selectedUsers.findIndex(name => name === value);
        if (index === -1) {
            selectedUsers.push(value); 
        } else {
            selectedUsers.splice(index, 1);
        }

        const newCompany = merge(localCompany, { subscribers: selectedUsers });
        this.setState({ localCompany: newCompany });
     };

    render() {      
        const { users, classes } = this.props;
        const { localCompany : { selectedUsers } } = this.state;
    
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
                        placeholder="Edit company`s name"
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
                        placeholder="Edit company`s email"
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
                        placeholder="Edit company`s address"
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
                        placeholder="Edit company`s phone number"
                        className={classes.textField}         
                        onChange={this.handleChange('telephone')}
                        margin="normal"
                    />
                    <InputLabel htmlFor="select-users">Allow access to users</InputLabel>
                    <Select
                        fullWidth
                        className={classes.select}
                        value={selectedUsers}
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
                            <Checkbox  checked={selectedUsers.indexOf(user.UserName) > -1} />
                            <ListItemText primary={user.UserName} />
                        </MenuItem>
                        ))}
                    </Select>
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

EditCompanyContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.instanceOf(Immutable.Iterable),
};

EditCompanyContainer.defaultProps = {
   users: Immutable.List(),
};

export default withStyles(styles)(connectToStores(EditCompanyContainer));