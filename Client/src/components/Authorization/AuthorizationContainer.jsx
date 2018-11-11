import React, { Component } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import RegistrationContainer from './RegistrationContainer.jsx';
import LoginContainer from './LoginContainer.jsx';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AuthorizationStore from '../../stores/AuthorizationStore';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});


class AuthorizationContainer extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static">
            <Tabs centered value={value} onChange={this.handleChange}>
              <Tab label="Login" />
              <Tab label="Registration" />
            </Tabs>   
        </AppBar>     
        {value === 0 && <LoginContainer/>}
        {value === 1 && <RegistrationContainer/>}
      </div>
    );
  }
}

AuthorizationContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthorizationContainer);