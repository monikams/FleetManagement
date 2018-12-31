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
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import UsersActions from '../actions/UsersActions.js';
import UsersStore from '../stores/UsersStore';
import Immutable from 'immutable';
import connectToStores from 'alt-utils/lib/connectToStores';
import isEmpty from 'lodash';

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
  basic: {
    height: '100%',
    width: '100%',
 },
 menuItemLabel: {
   marginRight: '5px',
   fontWeight: 'bold', 
}
};

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    }
  }

  static getStores() {
        return [UsersStore];
    }

  static getPropsFromStores() {
      return {
          user: UsersStore.getUser(),          
      }
  }

  componentWillMount() {
      const userId = localStorage.getItem('userId');
      UsersActions.loadUser(userId);
  } 

  handleLogoutClick = () => {
     logout();
  };

  handleProfileClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { classes, user } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
  
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
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              color="inherit"
              onClick={this.handleProfileClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <span className={classes.menuItemLabel} >Username:</span>
                {user.get('UserName')}
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <span className={classes.menuItemLabel} >Email:</span>
                {user.get('Email')} 
              </MenuItem>
              {!isEmpty(user.get('Telephone')) &&
                <MenuItem onClick={this.handleClose}>Telephone: {user.get('Telephone')}</MenuItem>
              }
            </Menu>
            <Button color="inherit" onClick={this.handleLogoutClick}>Logout</Button>
          </Toolbar>
        </AppBar>
        <div className={classes.basic} >
            {this.props.children}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  user:  PropTypes.instanceOf(Immutable.Map),
};

Home.defaultProps = {
    user: Immutable.Map({
        Id: '',
        Name: '',
        Email: '',
        Address: '',
        Telephone: '',
    }),
};

export default withStyles(styles)(connectToStores(Home));