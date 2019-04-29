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
                        error={!isFieldValid('email',isValid)}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="email"
                        label="Email"
                        placeholder="Enter driver`s email"
                        className={classes.textField}          
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
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
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="phone"
                        label="Phone"
                        placeholder="Enter driver`s phone number"
                        className={classes.textField}         
                        onChange={this.handleChange('telephone')}
                        margin="normal"
                    />
                </div>
                <div className={classes.container} >
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.handleSaveButtonClick}
                        id='saveButton'
                        disabled={isButtonDisabled(omit(localDriver, ['telephone'])) || isSaveButtonDisabled}
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