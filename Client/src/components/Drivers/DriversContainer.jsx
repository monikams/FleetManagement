import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import DriversStore from '../../stores/DriversStore';
import CompaniesStore from '../../stores/CompaniesStore';
import DriversActions from '../../actions/DriversActions.js';
import CompaniesActions from '../../actions/CompaniesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class DriversContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyId: '',
        };
    }

    static getStores() {
        return [CompaniesStore, DriversStore];
    }

    static getPropsFromStores() {
        return {
            drivers: DriversStore.getDrivers(),
            companies: CompaniesStore.getCompanies(),     
        }
    }

    componentWillMount() {
        DriversActions.loadDrivers();
        CompaniesActions.loadCompanies();
    }

    handleEditClick(driverId) {
        this.props.router.push({ pathname: `/editDriver/${driverId}` });
    };

     handleDeleteClick(driverId) {
        DriversActions.deleteDriver(driverId);
    };

    handleCreateDriverClick = () => {
         this.props.router.push('/createDriver');
    };

    handleCompanyChange = event => {
        const { company } = this.state;
        const { target: { value } } = event;
        this.setState({ companyId: value });
    }

    render() {      
        const { drivers, companies, classes } = this.props;
        const { companyId } = this.state;
       
        return (
            <div>
              <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="age-simple">Select company</InputLabel>
                    <Select
                        displayEmpty
                        value={companyId}
                        onChange={this.handleCompanyChange}
                        inputProps={{
                        name: 'age',
                        id: 'age-simple',
                        }}
                    >
                        {companies.map(company => (
                            <MenuItem key={company.Id} value={company.Id}>{company.Name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleCreateDriverClick}
                    id='loginButton'
                >
                    Create driver
                </Button>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telephone</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {drivers.map(driver => {
                            return (
                            <TableRow key={driver.Id}>
                                <TableCell component="th" scope="row">
                                {driver.Name}
                                </TableCell>
                                <TableCell>{driver.Address}</TableCell>
                                <TableCell>{driver.Email}</TableCell>
                                <TableCell>{driver.Telephone}</TableCell>
                                <TableCell><EditIcon onClick={() => this.handleEditClick(driver.Id)} /></TableCell>
                                <TableCell><DeleteIcon onClick={() => this.handleDeleteClick(driver.Id)} /></TableCell>
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

DriversContainer.propTypes = {
    drivers: PropTypes.instanceOf(Immutable.Iterable),
    companies: PropTypes.instanceOf(Immutable.Iterable),
    classes: PropTypes.object.isRequired,
};

DriversContainer.defaultProps = {
    drivers: Immutable.List(),
    companies: Immutable.List(),
};

export default withStyles(styles)(withRouter(connectToStores(DriversContainer)));