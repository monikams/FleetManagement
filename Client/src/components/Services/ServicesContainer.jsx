import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import ServicesStore from '../../stores/ServicesStore';
import CompaniesStore from '../../stores/CompaniesStore';
import ServicesActions from '../../actions/ServicesActions.js';
import CompaniesActions from '../../actions/CompaniesActions.js';
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
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
      marginTop: '15px', 
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

    handleEditClick(serviceId) {
        const { params: { vehicleId } } = this.props;
        //this.props.router.replace(`/companies/${companyId}/editDriver/${driverId}`);
    };

    handleDeleteClick(serviceId) {
        const { params: { vehicleId } } = this.props;
       // ServicesActions.deleteDriver(driverId, companyId);
    };

    handleCreateServiceClick = () => {
        const { params: { vehicleId } } = this.props;
       // this.props.router.replace(`/companies/${companyId}/createDriver`);
    };

    render() {      
        const { services, classes } = this.props;
        
        return (
            <div>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleCreateServiceClick}
                    id='loginButton'
                >
                    Create service
                </Button>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Mileage Rule</TableCell>
                            <TableCell>Next Service Mileage</TableCell>
                            <TableCell>Mileage Reminder</TableCell>
                            <TableCell>Time Rule</TableCell>
                            <TableCell>Next Service Time</TableCell>
                            <TableCell>Time Reminder</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {services.map(service => {
                            return (
                            <TableRow key={service.Id}>
                                <TableCell component="th" scope="row">
                                {service.Name}
                                </TableCell>
                                <TableCell>{service.Description}</TableCell>
                                <TableCell>{service.MileageRule}</TableCell>
                                <TableCell>{service.NextServiceMileage}</TableCell>
                                <TableCell>{service.MileageReminder}</TableCell>
                                <TableCell>{service.TimeRule}</TableCell>
                                <TableCell>{service.NextServiceTime}</TableCell>
                                <TableCell>{service.TimeReminder}</TableCell>
                                <TableCell><EditIcon onClick={() => this.handleEditClick(service.Id)}/></TableCell>
                                <TableCell><DeleteIcon onClick={() => this.handleDeleteClick(service.Id)} /></TableCell>
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
    services: PropTypes.instanceOf(Immutable.Iterable),
    classes: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

ServicesContainer.defaultProps = {
    services: Immutable.List(),
    params: {},
};

export default withStyles(styles)(withRouter(connectToStores(ServicesContainer)));