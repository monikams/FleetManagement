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
import TelematicsStore from '../../stores/TelematicsStore';
import TelematicsActions from '../../actions/TelematicsActions.js';

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
      return [VehiclesStore, TelematicsStore];
  }

  constructor(props) {
      super(props);
      const routes = props.router.routes;
      const length = routes.length;
      const lastElement = routes[length - 1];
      this.state = {
        value: lastElement.path === "reports" ? 1 : 0,
      }  
  }

  static getPropsFromStores() {
      return {
          vehicle: VehiclesStore.getVehicle(),
          telematicsData: TelematicsStore.getTelematicsData(), 
      }
  }

  componentWillMount() {
      const { params: { vehicleId } } = this.props;
      VehiclesActions.loadVehicle(vehicleId);
      TelematicsActions.loadTelematicsData(vehicleId);
  }

  componentWillUnmount() {
        TelematicsActions.unloadTelematicsData();
  }

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
    const { telematicsData, children, vehicle, classes } = this.props;
    const { value } = this.state;

    return (
      <div>
         <p className={classes.vehicleInfo} ><span className={classes.vehicleInfoLabel} >Brand: </span>{vehicle.get('Brand')}</p>
         <p className={classes.vehicleInfo} ><span className={classes.vehicleInfoLabel} >Plate number: </span>{vehicle.get('PlateNumber')}</p>
         <p className={classes.vehicleInfo} ><span className={classes.vehicleInfoLabel} >Current mileage: </span>{telematicsData.size !==0 && telematicsData.first().Mileage}km</p>
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
  telematicsData: PropTypes.instanceOf(Immutable.List),
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
};

PreviewService.defaultProps = {
    vehicle: Immutable.Map(),
    telematicsData: Immutable.List(),
    classes: {},
    children: null,
    params: {},
};


export default  withStyles(styles)(withRouter(connectToStores(PreviewService)));