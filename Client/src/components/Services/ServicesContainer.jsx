import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import ServicesStore from '../../stores/ServicesStore';
import CompaniesStore from '../../stores/CompaniesStore';
import VehiclesStore from '../../stores/VehiclesStore';
import ServicesActions from '../../actions/ServicesActions.js';
import CompaniesActions from '../../actions/CompaniesActions.js';
import VehiclesActions from '../../actions/VehiclesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import shallowEqual from 'shallowequal';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import moment from 'moment';
import isNull from 'lodash/isNull';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    backgroundColor: '#F0F0F0',
  },
  table: {
    minWidth: 700,
  },
  button: {
      marginTop: '15px',
      height: '40px', 
  },
  buttons: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '400px',
  },
  vehicleInfo: {
	fontSize: '18px',
	fontFamily: 'Arial',
  },
  vehicleInfoLabel: {
	fontWeight: 'bold',
  },
  checkCircle: {
      fill: 'green',
  }
});

class ServicesContainer extends Component {

    constructor(props) {
        super(props);
    }

    static getStores() {
        return [ServicesStore];
    }

    static getPropsFromStores() {
        return {
            services: ServicesStore.getServices(),
            vehicle: VehiclesStore.getVehicle(), 
        }
    }

    componentWillMount() {
        const { params: { vehicleId } } = this.props;
        ServicesActions.loadServices(vehicleId);
        VehiclesActions.loadVehicle(vehicleId);
    }

    componentWillUnmount() {
        const { params: { vehicleId } } = this.props;
        ServicesActions.unloadServices();
        VehiclesActions.unloadVehicle(vehicleId);
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    handleMarkAsDone(serviceId) {
        ServicesActions.markServiceAsDone(serviceId);
    }

    handleEditClick(serviceId) {
        const { params: { companyId, vehicleId } } = this.props;
        this.props.router.replace(`/companies/${companyId}/vehicles/${vehicleId}/editService/${serviceId}`);
    };

    handleDeleteClick(serviceId) {
        const { params: { vehicleId } } = this.props;
        ServicesActions.deleteService(vehicleId, serviceId);
    };

    handleCreateServiceClick = () => {
        const { params: { companyId, vehicleId } } = this.props;
        this.props.router.replace(`/companies/${companyId}/vehicles/${vehicleId}/createService`);
    };

    handleOverdueServicesClick = () => {
       const { params: { vehicleId }, services } = this.props;
       ServicesActions.loadServices(vehicleId, true);
    }

    render() {      
        const { services, vehicle, classes } = this.props;
        
        return (
            <div>
                <p className={classes.vehicleInfo} ><span className={classes.vehicleInfoLabel} >Model: </span>{vehicle.get('Model')}</p>
                <p className={classes.vehicleInfo} ><span className={classes.vehicleInfoLabel} >Plate Number: </span>{vehicle.get('PlateNumber')}</p>
                <div className={classes.buttons} >
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.handleCreateServiceClick}
                        id='createServiceButton'
                    >
                        Create service
                    </Button>
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="secondary" 
                        className={classes.button}
                        onClick={this.handleOverdueServicesClick}
                        id='overdueSericesButton'
                    >
                        Overdue services
                    </Button>
                </div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell padding="dense" >Name</TableCell>
                            <TableCell padding="dense">Description</TableCell>
                            <TableCell padding="dense">Mileage Rule</TableCell>
                            <TableCell padding="dense">Next Service Mileage</TableCell>
                            <TableCell padding="dense">Mileage Reminder</TableCell>
                            <TableCell padding="dense">Next Service Mileage Reminder</TableCell>
                            <TableCell padding="dense">Time Rule</TableCell>
                            <TableCell padding="dense">Next Service Time</TableCell>
                            <TableCell padding="dense">Time Reminder</TableCell>
                            <TableCell padding="dense">Next Service Time Reminder</TableCell>
                            <TableCell padding="dense">Mark as done</TableCell>
                            <TableCell padding="dense">Edit</TableCell>
                            <TableCell padding="dense">Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {services.map(service => {
                            return (
                            <TableRow key={service.Id}>
                                <TableCell component="th" scope="row" padding="dense" >
                                {service.Name}
                                </TableCell>
                                <TableCell padding="dense" >{!isNull(service.Description) && service.Description}</TableCell>
                                <TableCell padding="dense" >{service.BasedOn === 1 && !isNull(service.MileageRule) && service.MileageRule}</TableCell>
                                <TableCell padding="dense" >{service.BasedOn === 1 && !isNull(service.NextServiceMileage) && service.NextServiceMileage}</TableCell>
                                <TableCell padding="dense" >{service.BasedOn === 1 && !isNull(service.MileageReminder) && service.MileageReminder}</TableCell>
                                <TableCell padding="dense" >{service.BasedOn === 1 && !isNull(service.NextServiceReminderMileage) && service.NextServiceReminderMileage}</TableCell>
                                <TableCell padding="dense" >
                                {service.BasedOn === 0 && !isNull(service.TimeRule) && (service.TimeRuleEntity === 1 ? `${service.TimeRule} d` : service.TimeRuleEntity === 2 ? `${service.TimeRule} m` : `${service.TimeRule} y`)}
                                </TableCell>
                                <TableCell padding="dense" >{service.BasedOn === 0 && !isNull(service.NextServiceTime) && moment(service.NextServiceTime).format('DD/MM/YYYY')}</TableCell>
                                <TableCell padding="dense" >
                                {service.BasedOn === 0 && !isNull(service.TimeReminder) && (service.TimeReminderEntity === 1 ? `${service.TimeReminder} d` : service.TimeReminderEntity === 2 ? `${service.TimeReminder} m` : `${service.TimeReminder} y`)}
                                </TableCell>
                                <TableCell padding="dense" >{service.BasedOn === 0 && !isNull(service.NextServiceReminderTime) && moment(service.NextServiceReminderTime).format('DD/MM/YYYY')}</TableCell>
                                <TableCell padding="dense" ><CheckCircle className={classes.checkCircle} onClick={() => this.handleMarkAsDone(service.Id)}/></TableCell>
                                <TableCell padding="dense" ><EditIcon onClick={() => this.handleEditClick(service.Id)}/></TableCell>
                                <TableCell padding="dense" ><DeleteIcon color="secondary" onClick={() => this.handleDeleteClick(service.Id)} /></TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

ServicesContainer.propTypes = {
    services: PropTypes.instanceOf(Immutable.List),
    classes: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

ServicesContainer.defaultProps = {
    services: Immutable.List(),
    params: {},
};

export default withStyles(styles)(withRouter(connectToStores(ServicesContainer)));