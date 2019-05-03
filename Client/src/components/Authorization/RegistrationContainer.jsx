import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import AuthorizationActions from '../../actions/AuthorizationActions.js'
import connectToStores from 'alt-utils/lib/connectToStores';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../styles/AuthorizationContainer.css';
import { isFieldValid, isButtonDisabled } from '../../utils/validation.js';
import TextfieldValidationMessage from '../common/TextfieldValidationMessage.jsx'

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
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            isValid: {
                'username': true,
                'email': true,
                'validEmail': true,
                'password': true,
                'confirmPassword': true,
            },
		}
	}
   
    handleChange = name => event => {
        const { target: { value }} = event;     
        const { localUser, isValid } = this.state;
        const newUser = merge(localUser, { [name]: value });
        isValid[name] = !isEmpty(value);
        this.setState({ localUser: newUser });
    };

    handleBlur = name => event => {
        const { target: { value }} = event;     
        const { localUser, isValid } = this.state;
        const emailRegExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (name === 'validEmail') {
            isValid[name] = emailRegExpression.test(String(value).toLowerCase());
            let newUser;
            if (!isValid[name]) {
                 newUser = merge(localUser, { [name]: '' });    
            } else {
                 newUser = merge(localUser, { [name]: value }); 
            }

             this.setState({ localUser: newUser });
        }    
    };

    handleRegisterButtonClick = () => {
        AuthorizationActions.registerUser(this.state.localUser);
    }

 render() {
    const { classes } = this.props;
    const { localUser, isValid } = this.state;

    return (
      <div className={classes.form} >  
        <div className={classes.container} >
           <TextField
                required
                fullWidth
                error={!isFieldValid('username',isValid)}
                autoComplete="off"
                InputLabelProps={{
                    shrink: true,
                }}
                id="username"
                label="Username"
                placeholder="Enter your username"
                className={classes.textField}          
                onChange={this.handleChange('username')}
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
                placeholder="Enter your email"
                className={classes.textField}         
                onChange={this.handleChange('email')}
                onBlur={this.handleBlur('validEmail')}
                margin="normal"
            />
            {!isValid['validEmail'] && <TextfieldValidationMessage message="Please enter a valid email!" />}
            <TextField
                required
                fullWidth
                error={!isFieldValid('password',isValid)}
                autoComplete="off"
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
                error={!isFieldValid('confirmPassword',isValid)}
                autoComplete="off"
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
                id='registerButton'
                disabled={isButtonDisabled(localUser)}
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
