import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Immutable from 'immutable';
import TelematicsStore from '../../stores/TelematicsStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import TelematicsActions from '../../actions/TelematicsActions.js';
import shallowEqual from 'shallowequal';
import { isEmpty, isUndefined, isNull, merge } from 'lodash';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
var timespan = require('timespan');

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
        offTime: null,
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
        if (event.target.value === 'speed') {
            TelematicsActions.loadAverageSpeed(vehicleId, period);
        }
    };

    handlePeriodChange = event => {
        const { params: { vehicleId } } = this.props;
        TelematicsActions.loadTelematicsDataHistory(vehicleId, event.target.value);
        TelematicsActions.loadAverageSpeed(vehicleId, event.target.value);
        this.setState({ period: event.target.value });
    };

    getFinalOffTime = finalWorkingTimeSpan => {
        const { period } = this.state;
        let offTime; 
        let offTimeSpan;

         if (period === 'hour') {
            const hour = new timespan.TimeSpan(0,0,0,1);
            offTimeSpan = new timespan.TimeSpan(hour.msecs - finalWorkingTimeSpan.msecs);
            offTime = `${offTimeSpan.days} days, ${offTimeSpan.hours} hours, ${offTimeSpan.minutes} minutes, ${offTimeSpan.seconds} seconds`;
        } else if (period === 'day') {
            const day = new timespan.TimeSpan(0,0,0,24);
            offTimeSpan = new timespan.TimeSpan(day.msecs - finalWorkingTimeSpan.msecs);
            offTime = `${offTimeSpan.days} days, ${offTimeSpan.hours} hours, ${offTimeSpan.minutes} minutes, ${offTimeSpan.seconds} seconds`;
        } else if (period === 'week') {
            const week = new timespan.TimeSpan(0,0,0,168);
            offTimeSpan = new timespan.TimeSpan(week.msecs - finalWorkingTimeSpan.msecs);
            offTime = `${offTimeSpan.days} days, ${offTimeSpan.hours} hours, ${offTimeSpan.minutes} minutes, ${offTimeSpan.seconds} seconds`;
        } else if (period === 'month') {
            const month = new timespan.TimeSpan(0,0,0,0,30);
            offTimeSpan = new timespan.TimeSpan(month.msecs - finalWorkingTimeSpan.msecs);
            offTime = `${offTimeSpan.days} days, ${offTimeSpan.hours} hours, ${offTimeSpan.minutes} minutes, ${offTimeSpan.seconds} seconds`;
        } else {
            const year = new timespan.TimeSpan(0,0,0,0,365);
            offTimeSpan = new timespan.TimeSpan(year.msecs - finalWorkingTimeSpan.msecs);
            offTime = `${offTimeSpan.days} days, ${offTimeSpan.hours} hours, ${offTimeSpan.minutes} minutes, ${offTimeSpan.seconds} seconds`;
        } 

        return offTime;
    }

    renderDropdowns = () => (
        <div className={this.props.classes.dropdowns}>
            <FormControl className={this.props.classes.formControl}>
                    <InputLabel htmlFor="reports">Report</InputLabel>
                    <Select
                        native
                        value={this.state.report}
                        onChange={this.handleReportsChange}
                    >
                        <option value="mileage" >Mileage</option>
                        <option value="fuelLevel" >Fuel Level</option>
                        <option value="speed" >Speed</option>
                        <option value="workingTime" >On Time</option>
                        <option value="idleTime" >Idle Time</option>   
                        <option value="offTime" >Off Time</option>              
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
        const lastTelematicsHistoryElement = telematicsDataHistoryArray[telematicsDataHistoryArray.length - 1];
        const firstTelematicsHistoryElement = telematicsDataHistoryArray[0];
        let workingTimeSpan;
        let idleTimeSpan;
        let finalIdleTime;
        let finalWorkingTime;
       
        if (!isUndefined(lastTelematicsHistoryElement) && !isUndefined(firstTelematicsHistoryElement) && 
            !isNull(lastTelematicsHistoryElement.WorkingTime) && !isNull(firstTelematicsHistoryElement.WorkingTime)) {
             const momentLastTelematicsHistoryElement = moment(lastTelematicsHistoryElement.WorkingTime, 'HH:mm:ss');
             const momentFirstTelematicsHistoryElement = moment(firstTelematicsHistoryElement.WorkingTime, 'HH:mm:ss');
             const workTimeDuration = moment.duration(momentLastTelematicsHistoryElement - momentFirstTelematicsHistoryElement);     
             workingTimeSpan = new timespan.TimeSpan(workTimeDuration._milliseconds);
             finalWorkingTime = `${workingTimeSpan.days} days, ${workingTimeSpan.hours} hours, ${workingTimeSpan.minutes} minutes, ${workingTimeSpan.seconds} seconds`;
        }

        if (!isUndefined(lastTelematicsHistoryElement) && !isUndefined(firstTelematicsHistoryElement) && 
            !isNull(lastTelematicsHistoryElement.Idling) && !isNull(firstTelematicsHistoryElement.Idling)) {
             const momentLastTelematicsHistoryElement = moment(lastTelematicsHistoryElement.Idling, 'HH:mm:ss');
             const momentFirstTelematicsHistoryElement = moment(firstTelematicsHistoryElement.Idling, 'HH:mm:ss');
             const idleTimeDuration = moment.duration(momentLastTelematicsHistoryElement - momentFirstTelematicsHistoryElement);
             idleTimeSpan = new timespan.TimeSpan(idleTimeDuration._milliseconds);
             finalIdleTime = `${idleTimeSpan.days} days, ${idleTimeSpan.hours} hours, ${idleTimeSpan.minutes} minutes, ${idleTimeSpan.seconds} seconds`;
        }

        return (
        <div>
            {report === "mileage" && 
            <div>
                {this.renderDropdowns()}
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
                {this.renderDropdowns()}
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
                {this.renderDropdowns()}
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
            {report === "workingTime" && 
            <div>
                {this.renderDropdowns()}
                {telematicsDataHistoryArray.length !== 0 && <h4>On time: <span>{finalWorkingTime}</span></h4>}
            </div>}
            {report === "idleTime" && 
            <div>
                {this.renderDropdowns()}
                {telematicsDataHistoryArray.length !== 0 && <h4>Idle time: <span>{finalIdleTime}</span></h4>}
            </div>}
            {report === "offTime" && 
            <div>
                {this.renderDropdowns()}
                {telematicsDataHistoryArray.length !== 0 && <h4>Off time: <span>{this.getFinalOffTime(workingTimeSpan)}</span></h4>}
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