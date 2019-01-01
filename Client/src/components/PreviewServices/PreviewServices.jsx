import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Immutable from 'immutable';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import VehiclesStore from '../../stores/VehiclesStore';
import VehiclesActions from '../../actions/VehiclesActions.js';

const styles = {
  children: {
    flexGrow: 4
  },
  vehicleInfo: {
	  fontSize: '15px',
	  fontFamily: 'Arial',
  },
  vehicleInfoLabel: {
	  fontWeight: 'bold',
  },
};

class PreviewService extends React.Component {

  static getStores() {
      return [VehiclesStore];
  }

  static getPropsFromStores() {
      return {
          vehicle: VehiclesStore.getVehicle(), 
      }
  }

  componentWillMount() {
      const { params: { vehicleId } } = this.props;
      VehiclesActions.loadVehicle(vehicleId);
  }

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    const { params: { companyId, vehicleId } } = this.props;
    this.setState({ value });

    if (value === 0) {
      this.props.router.replace(`/companies/${companyId}/vehicles/${vehicleId}`);
    } else {
      this.props.router.replace(`/companies/${companyId}/vehicles/${vehicleId}/reports`);
    }
  };

  

  render() {
    const { children, vehicle, classes } = this.props;
    const { value } = this.state;

    return (
      <div>
         <p className={classes.vehicleInfo} ><span className={classes.vehicleInfoLabel} >Model: </span>{vehicle.get('Model')}</p>
         <p className={classes.vehicleInfo} ><span className={classes.vehicleInfoLabel} >Plate Number: </span>{vehicle.get('PlateNumber')}</p>
         <AppBar className={classes.root} position="static"> 
          <Tabs centered value={value} onChange={this.handleChange}>
            <Tab label="Services" />
            <Tab label="Reports" />
          </Tabs>   
        </AppBar> 
        <div className={classes.children} >
          {children}
        </div>
      </div>
    );
  }
}

PreviewService.propTypes = {
  vehicle: PropTypes.instanceOf(Immutable.Map),
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
};

PreviewService.defaultProps = {
    vehicle: Immutable.Map(),
    classes: {},
    children: null,
    params: {},
};


export default  withStyles(styles)(withRouter(connectToStores(PreviewService)));