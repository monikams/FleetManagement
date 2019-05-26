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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
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
    marginRight: '50px',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  chart: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dropdowns: {
    flex: 'row',
  },
});

class TelematicsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        report: 'mileage',
        period: 'week',
    }   
  }

   static getStores() {
        return [TelematicsStore];
    }

    static getPropsFromStores() {
        return {
            telematicsData: TelematicsStore.getTelematicsData(),
            telematicsDataHistory: TelematicsStore.getTelematicsDataHistory(),
            averageSpeed: TelematicsStore.getAverageSpeed(),
        }
    }

    componentWillMount() {
        const { params: { vehicleId } } = this.props;
        const { period } = this.state;
        TelematicsActions.loadTelematicsData(vehicleId);
        TelematicsActions.loadTelematicsDataHistory(vehicleId, period);
     //   TelematicsActions.loadAverageSpeed(vehicleId, period);
    }

    componentWillUnmount() {
        TelematicsActions.unloadTelematicsData();
        TelematicsActions.unloadTelematicsDataHistory();
        TelematicsActions.unloadAverageSpeed();
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    handleReportsChange = event => {
        const { params: { vehicleId } } = this.props;
        const { period } = this.state;
        this.setState({ report: event.target.value });
        TelematicsActions.loadAverageSpeed(vehicleId, period);
    };

    handlePeriodChange = event => {
        const { params: { vehicleId } } = this.props;
        TelematicsActions.loadTelematicsDataHistory(vehicleId, event.target.value);
        TelematicsActions.loadAverageSpeed(vehicleId, event.target.value);
        this.setState({ period: event.target.value });
    };

    renderPeriodDropdown = () => (
        <div className={this.props.classes.dropdowns}>
            <FormControl className={this.props.classes.formControl}>
                    <InputLabel htmlFor="reports">Reports</InputLabel>
                    <Select
                        native
                        value={this.state.report}
                        onChange={this.handleReportsChange}
                    >
                        <option value="mileage" >Mileage</option>
                        <option value="fuelLevel" >Fuel Level</option>
                        <option value="speed" >Speed</option>               
                    </Select>
            </FormControl>
            <FormControl className={this.props.classes.formControl} >
                    <InputLabel htmlFor="period">Period</InputLabel>
                    <Select
                        native
                        value={this.state.period}
                        onChange={this.handlePeriodChange}
                    >
                        <option value="hour" >Hour</option>
                        <option value="day" >Day</option>
                        <option value="week" >Week</option>
                        <option value="month" >Month</option>
                        <option value="year" >Year</option>
                        <option value="all" >All</option>                     
                    </Select>
            </FormControl>
        </div>
    );

    render() {
        const { telematicsData, telematicsDataHistory, classes, averageSpeed } = this.props;
        const { report, period } = this.state;
        const telematicsDataHistoryArray = telematicsDataHistory.toJS();

        return (
        <div>
            {report === "mileage" && 
            <div>
                {this.renderPeriodDropdown()}
                {telematicsData.size !== 0 && <h4>Current milege: <span>{telematicsData.first().Mileage}km</span></h4>}
                <h4>Mileage report:</h4>
                <AreaChart className={classes.chart} width={1000} height={280} data={telematicsDataHistoryArray} margin={{top: 20, right: 0, left: 30, bottom: 30}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey='FormattedModifiedDate' angle={-10} />                    
                    <YAxis unit="km" type="number" domain={['dataMin', 'dataMax']} />
                    <Tooltip/>
                    <Area type='monotone' dataKey='Mileage' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
            </div>}
            {report === "fuelLevel" && 
            <div>
                {this.renderPeriodDropdown()}
                {telematicsData.size !== 0 && <h4>Current fuel level: <span>{telematicsData.first().FuelLevel}%</span></h4>}
                <h4>Fuel level report:</h4>
                <AreaChart className={classes.chart} width={1000} height={280} data={telematicsDataHistoryArray} margin={{top: 20, right: 0, left: 30, bottom: 30}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey='FormattedModifiedDate' angle={-10} />
                    <YAxis unit="%" />
                    <Tooltip/>
                    <Area type='monotone' dataKey='FuelLevel' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
            </div>}
            {report === "speed" && 
            <div>
                {this.renderPeriodDropdown()}
                {telematicsData.size !== 0 && <h4>Current speed: <span>{telematicsData.first().CurrentSpeed}km/h</span></h4>}
                <h4>Average speed: <span>{averageSpeed.toFixed(2)}km/h</span></h4>
                <h4>Current speed report:</h4>
                <AreaChart className={classes.chart} width={1000} height={280} data={telematicsDataHistoryArray} margin={{top: 20, right: 0, left: 30, bottom: 30}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey='FormattedModifiedDate' angle={-10} />
                    <YAxis unit="km/h" />
                    <Tooltip/>
                    <Area type='monotone' dataKey='CurrentSpeed' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
            </div>}
        </div>
        );
    }
}

TelematicsContainer.propTypes = {
    telematicsData: PropTypes.instanceOf(Immutable.List),
    telematicsDataHistory: PropTypes.instanceOf(Immutable.List),
    averageSpeed: PropTypes.number,
    params: PropTypes.object.isRequired,
};

TelematicsContainer.defaultProps = {
    telematicsData: Immutable.List(),
    telematicsDataHistory: Immutable.List(),
    averageSpeed: 0,
    params: {},
};

export default withStyles(styles)(connectToStores(TelematicsContainer));