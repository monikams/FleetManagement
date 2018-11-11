import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import merge from 'lodash/merge';
import AuthorizationActions from '../../actions/AuthorizationActions.js'
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

class LoginContainer extends Component {
    constructor() {
		super();
		this.state = {
			localUser: {
                username: '',
                password: '',
            },
		}
	}
   
    handleChange = name => event => {
        const { target: { value }} = event;     
        const { localUser } = this.state;
        const updatedUser = merge(localUser, { [name]: value });
        this.setState({
            localUser: updatedUser
        });
    };

    handleLoginButtonClick = () => {
        const { localUser } = this.state;
        const updatedUser = merge(localUser, { 'grant_type': 'password' });
        AuthorizationActions.getAuthToken(updatedUser);
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
        </div>
        <div className={classes.container} >
            <Button 
                variant="contained" 
                size="large" 
                color="primary" 
                className={classes.button}
                onClick={this.handleLoginButtonClick}
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
};

LoginContainer.defaultProps = {
    users: Immutable.List(),
};

export default withStyles(styles)(LoginContainer);