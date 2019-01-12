import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Immutable from 'immutable';
import TelematicsStore from '../../stores/TelematicsStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import TelematicsActions from '../../actions/TelematicsActions.js';
import isEmpty from 'lodash';

class TelematicsContainer extends React.Component {

  constructor(props) {
    super(props);   
  }

   static getStores() {
        return [TelematicsStore];
    }

    static getPropsFromStores() {
        return {
            telematicsData: TelematicsStore.getTelematicsData(),
        }
    }

    componentWillMount() {
        const { params: { vehicleId } } = this.props;
        TelematicsActions.loadTelematicsData(vehicleId);
    }

  render() {
    const { telematicsData } = this.props;
    console.log(telematicsData);

    return (
     <p>Hello World</p>
    );
  }
}

TelematicsContainer.propTypes = {
    telematicsData: PropTypes.instanceOf(Immutable.List),
    params: PropTypes.object.isRequired,
};

TelematicsContainer.defaultProps = {
    telematicsData: Immutable.List(),
    params: {},
};

export default connectToStores(TelematicsContainer);