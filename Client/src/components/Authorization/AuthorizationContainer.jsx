
import React, { Component } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AuthorizationStore from '../../stores/AuthorizationStore';
import '../../styles/AuthorizationContainer.css';
import { withRouter } from 'react-router';

const styles = theme => ({
  root: {
    height: '64px',
  },
});


class AuthorizationContainer extends React.Component {
 
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    if (value === 0) {
      this.props.router.push('/');
    } else {
      this.props.router.push('register');
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <AppBar className={classes.root} position="static">
            <Tabs centered value={value} onChange={this.handleChange}>
              <Tab label="Login" />
              <Tab label="Registration" />
            </Tabs>   
        </AppBar>     
        {this.props.children}
      </div>
    );
  }
}

AuthorizationContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AuthorizationContainer));