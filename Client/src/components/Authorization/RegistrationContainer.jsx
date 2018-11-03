import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
// import RegistrationStore from '../stores/RegistrationStore';
// import RegistrationActions from '../actions/RegistrationActions.js'
import connectToStores from 'alt-utils/lib/connectToStores';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
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
            },
		}
	}

    // static getStores() {
    //     return [RegistrationStore];
    // }

    // static getPropsFromStores() {
    //     return {
    //         Registration: RegistrationStore.getRegistration(),           
    //     }
    // }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

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
            value={localUser.name}
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
            value={localUser.email}
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
            margin="normal"
            />
        </div>
        <div className={classes.container} >
            <Button 
                variant="contained" 
                size="large" 
                color="primary" 
                className={classes.button}
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
};

export default withStyles(styles)(RegistrationContainer);

// export default connectToStores(RegistrationContainer);
//export default RegistrationContainer;