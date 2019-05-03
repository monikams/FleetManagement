import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import merge from 'lodash/merge';
import AuthorizationActions from '../../actions/AuthorizationActions.js';
import MessagesStore from '../../stores/MessagesStore';
import MessagesActions from '../../actions/MessagesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { isFieldValid, isButtonDisabled } from '../../utils/validation.js';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../styles/AuthorizationContainer.css';
import isEmpty from 'lodash/isEmpty';
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

class LoginContainer extends Component {
    constructor() {
		super();
		this.state = {
			localUser: {
                username: '',
                password: '',
            },
            isValid: {
                'username': true,
                'password': true,
            },
            showErrorMessage: false,
            errorMessage: ''
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
        const updatedUser = merge(localUser, { [name]: value }); 
        isValid[name] = !isEmpty(value);

        this.setState({
            localUser: updatedUser,
            isValid: isValid,
        });
    };

    handleClose = () => {
        this.setState({ showErrorMessage: false, errorMessage: '' });
    }

    handleLoginButtonClick = () => {
        const { localUser } = this.state;
        const updatedUser = merge(localUser, { 'grant_type': 'password' });
        AuthorizationActions.loginUser(updatedUser);
    }

 render() {
    const { classes } = this.props;
    const { localUser, isValid, showErrorMessage, errorMessage } = this.state;

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
                onClick={this.handleLoginButtonClick}
                id='loginButton'
                disabled={isButtonDisabled(localUser)}
            >
                Login
            </Button>
         </div>
      </div>  
    );
  }
}

LoginContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.instanceOf(Immutable.Iterable),
  showErrorMessage: PropTypes.bool.isRequired,
};

LoginContainer.defaultProps = {
    users: Immutable.List(),
    showErrorMessage: false,
};

export default withStyles(styles)(connectToStores(LoginContainer));
