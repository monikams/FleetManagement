import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Immutable from 'immutable';
import TelematicsStore from '../../stores/TelematicsStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import TelematicsActions from '../../actions/TelematicsActions.js';
import shallowEqual from 'shallowequal';
import { isEmpty, merge } from 'lodash';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  chart: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

class TelematicsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        report: 'mileage',
    }   
  }

   static getStores() {
        return [TelematicsStore];
    }

    static getPropsFromStores() {
        return {
            telematicsData: TelematicsStore.getTelematicsData(),
            telematicsDataHistory: TelematicsStore.getTelematicsDataHistory(),
        }
    }

    componentWillMount() {
        const { params: { vehicleId } } = this.props;
        TelematicsActions.loadTelematicsData(vehicleId);
        TelematicsActions.loadTelematicsDataHistory(vehicleId);
    }

    componentWillUnmount() {
        TelematicsActions.unloadTelematicsData();
        TelematicsActions.unloadTelematicsDataHistory();
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    handleChange = event => {
        this.setState({ report: event.target.value });
    };

    render() {
        const { telematicsData, telematicsDataHistory, classes } = this.props;
        const { report } = this.state;
        const telematicsDataHistoryArray = telematicsDataHistory.toJS();
        let chartTelematicsDataHistory = [];
        telematicsDataHistoryArray.forEach(item => 
        {
            const formattedDate = moment(item.Modified).format('DD/MM/YY/LT');         
            const updatedItem = merge(item, { 'Modified': formattedDate });
            chartTelematicsDataHistory.push(updatedItem);
        });

        return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="reports">Reports</InputLabel>
                <Select
                    native
                    value={this.state.report}
                    onChange={this.handleChange}
                >
                    <option value="mileage" >Mileage</option>
                    <option value="fuelLevel" >Fuel Level</option>               
                </Select>
            </FormControl>
            {report === "mileage" && 
            <div>
                <h4>Current milege: <span>{telematicsData.size !==0 && telematicsData.first().Mileage}</span></h4>
                <h4>Week mileage report:</h4>
                <AreaChart className={classes.chart} width={1000} height={280} data={chartTelematicsDataHistory} margin={{top: 20, right: 0, left: 30, bottom: 30}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey='Modified' angle={-13} textAnchor="end"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='Mileage' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
            </div>}
            {report === "fuelLevel" && 
            <div>
                <h4>Current fuel level: <span>{telematicsData.size !==0 && telematicsData.first().FuelLevel}</span></h4>
                <h4>Week fuel level report:</h4>
                <AreaChart className={classes.chart} width={1000} height={280} data={chartTelematicsDataHistory} margin={{top: 20, right: 0, left: 30, bottom: 30}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey='Modified' angle={-13} textAnchor="end" />
                    <YAxis />
                    <Tooltip/>
                    <Area type='monotone' dataKey='FuelLevel' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
            </div>}
        </div>
        );
    }
}

TelematicsContainer.propTypes = {
    telematicsData: PropTypes.instanceOf(Immutable.List),
    telematicsDataHistory: PropTypes.instanceOf(Immutable.List),
    params: PropTypes.object.isRequired,
};

TelematicsContainer.defaultProps = {
    telematicsData: Immutable.List(),
    telematicsDataHistory: Immutable.List(),
    params: {},
};

export default withStyles(styles)(connectToStores(TelematicsContainer));