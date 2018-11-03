import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import merge from 'lodash/merge';
import RegistrationStore from '../stores/RegistrationStore.js';
import RegistrationActions from '../actions/RegistrationActions.js'
import connectToStores from 'alt-utils/lib/connectToStores';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    marginTop: '20px',
    width: '112px',
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
});

class RegistrationContainer extends Component {
    constructor() {
		super();
		this.state = {
			localUser: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
		}
	}

    // static getStores() {
    //     return [RegistrationStore];
    // }

    // static getPropsFromStores() {
    //     return {
    //         users: RegistrationStore.getRegistration(),           
    //     }
    // }
    
    handleChange = name => event => {
        const { target: { value }} = event;     
        const { localUser } = this.state;
        const newUser = merge(localUser, { [name]: value });
        this.setState({
            localUser: newUser
        });
    };

    handleRegisterButtonClick = () => {
        RegistrationActions.registerUser(this.state.localUser);
    }

 render() {
    const { classes } = this.props;
    const { localUser } = this.state;

    return (
      <div className={classes.form} >  
        <div className={classes.container} >
            <TextField
            required
            fullWidth
            id="name"
            label="Name"
            placeholder="Enter your name"
            className={classes.textField}          
            //value={localUser.name}
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
            placeholder="Enter your email"
            className={classes.textField}         
           // value={localUser.email}
            onChange={this.handleChange('email')}
            margin="normal"
            />
            <TextField
            required
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
            id="password"
            label="Password"
            placeholder="Enter your password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            onChange={this.handleChange('password')}
            margin="normal"
            />
            <TextField
            required
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
            id="confirm-password"
            label="Confirm password"
            placeholder="Confirm your password"
            className={classes.textField}
            type="password"
            onChange={this.handleChange('confirmPassword')}
            margin="normal"
            />
        </div>
        <div className={classes.container} >
            <Button 
                variant="contained" 
                size="large" 
                color="primary" 
                className={classes.button}
                onClick={this.handleRegisterButtonClick}
            >
                Register
            </Button>
         </div>
      </div>  
    );
  }
}

RegistrationContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.instanceOf(Immutable.Iterable),
};

RegistrationContainer.defaultProps = {
    users: Immutable.List(),
};

export default withStyles(styles)(RegistrationContainer);

//export default connectToStores(withStyles(styles)(RegistrationContainer));
//export default connectToStores(RegistrationContainer);
//export default RegistrationContainer;