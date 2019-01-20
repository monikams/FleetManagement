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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from 'react-router';
import moment from 'moment';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  checkCircle: {
    fill: 'green',
  },
  checkbox: {
    marginTop: '10px',
  },
});

class ServicesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            overdueServicesSelected: false,
            markedAsDoneServiceId: "",
            deletedServiceId: "",
        }
    }

    static getStores() {
        return [ServicesStore];
    }

    static getPropsFromStores() {
        return {
            services: ServicesStore.getServices(),
        }
    }

    componentWillMount() {
        const { params: { vehicleId } } = this.props;
        ServicesActions.loadServices(vehicleId);
    }

    componentWillUnmount() {
        ServicesActions.unloadServices();
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    handleMarkAsDone(serviceId) {
        const { params: { vehicleId } } = this.props;
        ServicesActions.markServiceAsDone(vehicleId, serviceId);
        this.handleCloseMarkAsDoneModal();
    }

    handleEditClick(serviceId) {
        const { params: { companyId, vehicleId } } = this.props;
        this.props.router.replace(`/companies/${companyId}/vehicles/${vehicleId}/editService/${serviceId}`);
    };

    handleDelete(serviceId) {
        const { params: { vehicleId } } = this.props;
        ServicesActions.deleteService(vehicleId, serviceId);
        this.handleCloseDeleteModal();
    };

    handleCreateServiceClick = () => {
        const { params: { companyId, vehicleId } } = this.props;
        this.props.router.replace(`/companies/${companyId}/vehicles/${vehicleId}/createService`);
    };

    handleOverdueServicesClick = () => {
       const { params: { vehicleId }, services } = this.props;
       this.setState({ overdueServicesSelected: !this.state.overdueServicesSelected })
       ServicesActions.loadServices(vehicleId, !this.state.overdueServicesSelected);
    }

    handleOpenMarkAsDoneModal = serviceId => {
        this.setState({ markedAsDoneServiceId: serviceId });
    }

    handleCloseMarkAsDoneModal = () => {
        this.setState({ markedAsDoneServiceId: "" });
    };

    handleOpenDeleteModal = serviceId => {
        this.setState({ deletedServiceId: serviceId });
    }

    handleCloseDeleteModal = () => {
        this.setState({ deletedServiceId: "" });
    };


    renderMarkAsDoneModal = serviceId => 
    (
        <Dialog
          open={!isEmpty(this.state.markedAsDoneServiceId)}
          onClose={this.handleCloseMarkAsDoneModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Mark this service as done"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you mark this service as done, your next service information will be recalculated based on the time/mileage rules.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleMarkAsDone(serviceId)} color="primary" variant="contained" className={this.props.classes.button} >
               OK
            </Button>
             <Button onClick={this.handleCloseMarkAsDoneModal} variant="contained" className={this.props.classes.button} >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );

    renderDeleteModal = serviceId =>
    (
        <Dialog
          open={!isEmpty(this.state.deletedServiceId)}
          onClose={this.handleCloseDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete this service"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure that you want to delete this service?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDelete(serviceId)} color="primary" variant="contained" className={this.props.classes.button} >
               Yes
            </Button>
             <Button onClick={this.handleCloseDeleteModal} variant="contained" className={this.props.classes.button} >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );
    

    render() {      
        const { services, classes } = this.props;
        const { overdueServicesSelected, markedAsDoneServiceId, deletedServiceId } = this.state;

        return (
            <div>
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
                    <FormControlLabel
                        className={classes.checkbox}
                        control={
                            <Checkbox
                                label="Overdue services"
                                checked={overdueServicesSelected}
                                onClick={this.handleOverdueServicesClick}
                                value={overdueServicesSelected}
                            />
                        }
                       label="Overdue services"
                    />
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
                                {service.BasedOn === 0 && !isNull(service.TimeRule) && (service.TimeRuleEntity === 1 ? `${service.TimeRule} d` : service.TimeRuleEntity === 2 ? `${service.TimeRule} m` : service.TimeRuleEntity === 3 ? `${service.TimeRule} y` : null)}
                                </TableCell>
                                <TableCell padding="dense" >{service.BasedOn === 0 && !isNull(service.NextServiceTime) && moment(service.NextServiceTime).format('DD/MM/YY')}</TableCell>
                                <TableCell padding="dense" >
                                {service.BasedOn === 0 && !isNull(service.TimeReminder) && (service.TimeReminderEntity === 1 ? `${service.TimeReminder} d` : service.TimeReminderEntity === 2 ? `${service.TimeReminder} m` : service.TimeReminderEntity === 3 ? `${service.TimeReminder} y` : null)}
                                </TableCell>
                                <TableCell padding="dense" >{service.BasedOn === 0 && !isNull(service.NextServiceReminderTime) && moment(service.NextServiceReminderTime).format('DD/MM/YY')}</TableCell>
                                <TableCell padding="dense" ><CheckCircle className={classes.checkCircle} onClick={() => this.handleOpenMarkAsDoneModal(service.Id)}/></TableCell>
                                <TableCell padding="dense" ><EditIcon onClick={() => this.handleEditClick(service.Id)}/></TableCell>
                                <TableCell padding="dense" ><DeleteIcon color="secondary" onClick={() => this.handleOpenDeleteModal(service.Id)} /></TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
                {!isEmpty(markedAsDoneServiceId) && this.renderMarkAsDoneModal(markedAsDoneServiceId)}
                {!isEmpty(deletedServiceId) && this.renderDeleteModal(deletedServiceId)}
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