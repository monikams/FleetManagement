import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import '../styles/Home.css';
import { isLoggedIn, logout } from '../utils/authorized-requests.js';

const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Home extends React.Component {
  handleLogoutClick = () => {
     logout();
  };

  render() {
    const { classes } = this.props;
    
    return (
      isLoggedIn() &&
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Fleet Management
            </Typography>
            <IconButton
              id="profile-button"
              aria-owns="material-appbar"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Button color="inherit" onClick={this.handleLogoutClick}>Logout</Button>
          </Toolbar>
        </AppBar>
        <div className='basic'>
            {this.props.children}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Home);