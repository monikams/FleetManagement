import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import UsersStore from '../stores/UsersStore';
import UsersActions from '../actions/UsersActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

class CreateCompanyContainer extends Component {

     constructor(props) {
        super(props);
        this.state = {
            selectedUsers: [],
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
        // const { target: { value }} = event;     
        // const { localUser } = this.state;
        // const newUser = merge(localUser, { [name]: value });
        // this.setState({
        //     localUser: newUser
        // });
    };

    handleSaveButtonClick = () => {
        //AuthorizationActions.registerUser(this.state.localUser);
    }

     handleUserDropdownChange = event => {
        const { target: { value } } = event;
        const { selectedUsers } = this.state;
        const index = selectedUsers.findIndex(name => name === value);
        if (index === -1) {
            selectedUsers.push(value); 
        } else {
            selectedUsers.splice(index, 1);
        }
        this.setState({ selectedUsers });
     };

    render() {      
        const { users, classes } = this.props;
        const { selectedUsers } = this.state;
    
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
                        placeholder="Enter company`s name"
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
                        placeholder="Enter company`s email"
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
                        placeholder="Enter company`s address"
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
                        placeholder="Enter company`s phone number"
                        className={classes.textField}         
                        onChange={this.handleChange('phone')}
                        margin="normal"
                    />
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

CreateCompanyContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.instanceOf(Immutable.Iterable),
};

CreateCompanyContainer.defaultProps = {
   users: Immutable.List(),
};

export default withStyles(styles)(connectToStores(CreateCompanyContainer));