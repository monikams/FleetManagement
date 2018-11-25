import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import UsersStore from '../stores/UsersStore';
import UsersActions from '../actions/UsersActions.js';
import CompaniesActions from '../actions/CompaniesActions.js';
import CompaniesStore from '../stores/CompaniesStore';
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
			localCompany: this.props.company,
		} 
    }

    static getStores() {
        return [UsersStore, CompaniesStore];
    }

    static getPropsFromStores() {
        return {
            users: UsersStore.getUsers(),
            company: CompaniesStore.getCompany(),           
        }
    }

    componentWillMount() {
        const { params: { companyId } } = this.props;
        UsersActions.loadUsers();
        CompaniesActions.loadCompany(companyId);
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
      
     };

    render() {      
        const { users, classes } = this.props;
        const { localCompany } = this.state;
        console.log(localCompany);
    
        return (
            <div className={classes.form} >  
                <div className={classes.container} >
                    <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={localCompany.get("Name")}
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
                        value={localCompany.get("Email")}
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
                        value={localCompany.get("Address")}
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
                        value={localCompany.get("Telephone")}
                        id="phone"
                        label="Phone"
                        placeholder="Edit company`s phone number"
                        className={classes.textField}         
                        onChange={this.handleChange('telephone')}
                        margin="normal"
                    />
                    <InputLabel htmlFor="select-users">Allow access to users</InputLabel>
                   
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
    company: PropTypes.instanceOf(Immutable.Map),
    params: PropTypes.object.isRequired,
};

EditCompanyContainer.defaultProps = {
   users: Immutable.List(),
};

export default withStyles(styles)(connectToStores(EditCompanyContainer));