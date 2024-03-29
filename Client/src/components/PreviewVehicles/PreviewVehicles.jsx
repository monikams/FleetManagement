import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Immutable from 'immutable';
import { withRouter } from 'react-router';

const styles = {
  children: {
    flexGrow: 4
  }
};

class PreviewVehicle extends React.Component {

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.children} >
        {children}
      </div>
    );
  }
}

PreviewVehicle.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
};

PreviewVehicle.defaultProps = {
    classes: {},
    children: null,
    params: {},
};


export default  withStyles(styles)(withRouter(PreviewVehicle));