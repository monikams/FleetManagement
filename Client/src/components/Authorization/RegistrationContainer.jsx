import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import AuthorizationActions from '../../actions/AuthorizationActions.js'
import MessagesActions from '../../actions/MessagesActions.js';
import MessagesStore from '../../stores/MessagesStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../styles/AuthorizationContainer.css';
import { isFieldValid, isButtonDisabled } from '../../utils/validation.js';
import TextfieldValidationMessage from '../common/TextfieldValidationMessage.jsx';
import SnackbarContentWrapper from '../common/SnackbarContentWrapper.jsx';

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
  snackBar: {
    width: '100%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
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
                'validConfirmPassword': true,
            },
            showErrorMessage: false,
            errorMessage: '',
            isRegisterButtonDisabled: false,
		}
	}

    static getStores() {
        return [MessagesStore];
    }

    static getPropsFromStores() {
        return {
            showErrorMessage: MessagesStore.getShowErrorMessage(),
            errorMessage: MessagesStore.getErrorMessage()           
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ showErrorMessage: nextProps.showErrorMessage, errorMessage: nextProps.errorMessage });
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
        
        let newUser;
        if (name === 'validEmail') {
            isValid[name] = emailRegExpression.test(String(value).toLowerCase());           
        } else if (name === 'validConfirmPassword') {
            isValid[name] = localUser.password === value; 
        }  

         if (!isValid[name]) {
            newUser = merge(localUser, { [name]: '' });    
        } else {
            newUser = merge(localUser, { [name]: value }); 
        }

        this.setState({ localUser: newUser });
    };

    handleRegisterButtonClick = () => {
        AuthorizationActions.registerUser(this.state.localUser);
        this.setState({ isRegisterButtonDisabled: true });
    }

    handleClose = () => {
        this.setState({ showErrorMessage: false, isRegisterButtonDisabled: false });
    }

 render() {
    const { classes } = this.props;
    const { localUser, isValid, showErrorMessage, errorMessage, isRegisterButtonDisabled } = this.state;

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
                error={!isFieldValid('confirmPassword',isValid) || !isFieldValid('validConfirmPassword',isValid)}
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
                onBlur={this.handleBlur('validConfirmPassword')}
                margin="normal"
            />
            {!isValid['validConfirmPassword'] && <TextfieldValidationMessage message="Password doesn't match!" />}
            <SnackbarContentWrapper
                variant="error"
                message={errorMessage}
                onClose={this.handleClose}
                open={showErrorMessage}
                className={classes.snackBar}
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
                disabled={isButtonDisabled(localUser) || isRegisterButtonDisabled}
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

export default withStyles(styles)(connectToStores(RegistrationContainer));
