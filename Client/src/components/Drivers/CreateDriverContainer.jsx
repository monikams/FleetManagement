import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import DriversActions from '../../actions/DriversActions.js';
import { withStyles } from '@material-ui/core/styles';
import { isFieldValid, isButtonDisabled } from '../../utils/validation.js';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextfieldValidationMessage from '../common/TextfieldValidationMessage.jsx';

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
    marginTop: '30px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class CreateDriverContainer extends Component {

     constructor(props) {
        super(props);
        const { params: { companyId } } = this.props;
        this.state = {
			localDriver: {
                name: '',
                email: '',
                address: '',
                telephone: '',
                companyId: companyId,
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

    handleChange = name => event => {
        const { target: { value }} = event;     
        const { localDriver,isValid } = this.state;
        const newDriver = merge(localDriver, { [name]: value });
        isValid[name] = !isEmpty(value);
        this.setState({ 
            localDriver: newDriver,
            isValid: isValid
       });
    };

    handleBlur = name => event => {
        const { target: { value }} = event;     
        const { localDriver, isValid } = this.state;
        const emailRegExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneRegExpression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        let newDriver;
        if (name === 'validEmail') {
            isValid[name] = emailRegExpression.test(String(value).toLowerCase());           
        } else if (name === 'validPhone') {
            isValid[name] = phoneRegExpression.test(String(value).toLowerCase());
        }  

         if (!isValid[name]) {
            newDriver = merge(localDriver, { [name]: '' });    
        } else {
            newDriver = merge(localDriver, { [name]: value }); 
        }

        this.setState({ localDriver: newDriver });
    };

    handleSaveButtonClick = () => {
        const { localDriver } = this.state;   
        DriversActions.createDriver(localDriver);
        this.setState({ isSaveButtonDisabled: true });
    }

    render() {      
        const { classes, companies } = this.props;
        const { localDriver, isValid, isSaveButtonDisabled } = this.state;
    
        return (
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
                        placeholder="Enter driver`s name"
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
                        placeholder="Enter driver`s email"
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
                        placeholder="Enter driver`s address"
                        className={classes.textField}         
                        onChange={this.handleChange('address')}
                        margin="normal"
                    />
                     <TextField
                        fullWidth
                        error={!isValid['validPhone']}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="phone"
                        label="Phone"
                        placeholder="Enter driver`s phone number"
                        className={classes.textField}         
                        onChange={this.handleChange('telephone')}
                        onBlur={this.handleBlur('validPhone')}
                        margin="normal"
                    />
                    {!isValid['validPhone'] && <TextfieldValidationMessage message="Please enter a valid phone number!" />}
                </div>
                <div className={classes.container} >
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.handleSaveButtonClick}
                        id='saveButton'
                        disabled={isButtonDisabled(omit(localDriver, ['telephone'])) || !isValid['validPhone'] || isSaveButtonDisabled}
                    >
                        Save
                    </Button>
                </div>
            </div>  
        );
    }
}

CreateDriverContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

CreateDriverContainer.defaultProps = {
   params: {},
};

export default withStyles(styles)(CreateDriverContainer);