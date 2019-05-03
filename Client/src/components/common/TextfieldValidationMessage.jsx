import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  emailValidationMessage: {
    color: '#F44336',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    padding: 0,
    fontSize: '0.8rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    lineHeight: 1,
  }
});

function TextfieldValidationMessage(props) {
  const { classes, message } = props;

  return (
    <p id="email-error-text" className={classes.emailValidationMessage} >{message}</p>
  );
}

TextfieldValidationMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

TextfieldValidationMessage.defaultProps = {
    message: 'Error!',
};

export default withStyles(styles)(TextfieldValidationMessage);
