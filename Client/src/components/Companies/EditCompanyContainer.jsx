import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import UsersStore from '../../stores/UsersStore';
import UsersActions from '../../actions/UsersActions.js';
import CompaniesActions from '../../actions/CompaniesActions.js';
import CompaniesStore from '../../stores/CompaniesStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import EditCompany from './EditCompany';

class EditCompanyContainer extends Component {

     constructor(props) {
        super(props);
        this.state = {
		company: Immutable.Map({
            Id: '',
            CreatorId: '',
            Name: '',
            Email: '',
            Address: '',
            Telephone: '',
            Subscribers: Immutable.List(),
            Creator: {},
        }),
        subscribers: [],
        selectedSubscribers: [],
        subscribersChanged: false,
		} 
    }

    static getStores() {
        return [UsersStore, CompaniesStore];
    }

    static getPropsFromStores() {
        return {
            users: UsersStore.getUsers(),
            company: CompaniesStore.getCompany(),           
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    componentWillMount() {
        const { params: { companyId } } = this.props;
        UsersActions.loadUsers();
        CompaniesActions.loadCompany(companyId, true);
    }

    //  componentDidMount() {
    //     debugger;
    //     const company = this.props.company.get('company');
    //     this.setState({ subscribers: company.get('Subscribers') });
    //  }

    componentWillUnmount() { 
        CompaniesActions.unloadCompany();
        UsersActions.unloadUsers();
    }

    handleSaveButtonClick = () => {
        const company = this.props.company.get('company');
        const updatedCompany = company.update('Subscribers', subscribers => this.state.selectedSubscribers);
        this.setState({ localCompany: updatedCompany });       
        const { localCompany } = this.state;

       if (localCompany === undefined) {
          this.props.router.push('companies');
       } else {
          CompaniesActions.editCompany(localCompany);
       }
    }

    handleChange = (name, event) => {
        const { target: { value }} = event;  
        const { company } = this.props;   
        const updatedCompany = company.get('company').update(name, oldValue => value);
        this.setState({ localCompany: updatedCompany });
    };

    handleUserDropdownChange = event => {
        const { users } = this.props;
        const company = this.props.company.get('company');
        const { target: { value } } = event;   
        
        // if (this.state.subscribers && this.state.subscribers.length === 0) {
        //     this.setState({ subscribers: company.get('Subscribers') });
        // }
    
        // if (company) {
        //      const subscribers = this.state.subscribers.map(user => user.UserName); 
        //      const index = subscribers.findIndex(name => name === value);
        //     if (index === -1) {           
        //         this.state.subscribers.push(value);
        //     } else {
        //         this.state.subscribers.splice(index, 1);
        //     }

        //     const selectedUsers = this.state.subscribers.map(name => users.filter(user => user.UserName === name)).map(user => user.first());
        //     this.setState({ selectedSubscribers: selectedUsers });
        // }

        let updatedCompany;
        let selectedUsers;
        let subscribers;
        let subscribersChanged = this.state.subscribersChanged;

        if(company) {
            if (this.state.subscribers && this.state.subscribers.length === 0 && !subscribersChanged) {
                subscribers = company.get('Subscribers');
            } else {
                subscribers = this.state.subscribers;
            }

            const updatedSubscribers = subscribers.map(user => user.UserName);
            const index = updatedSubscribers.findIndex(name => name === value);
            if (index === -1) {
                updatedSubscribers.push(value);             
            } else {
                updatedSubscribers.splice(index, 1);
            }

            subscribersChanged = true;

            this.setState({ subscribers: updatedSubscribers });
            this.setState({ subscribersChanged: subscribersChanged });

            selectedUsers = updatedSubscribers.map(name => users.filter(user => user.UserName === name)).map(user => user.first());
            updatedCompany = company.update('Subscribers', subscribers => selectedUsers);
            this.setState({ localCompany: updatedCompany });       
        }
     };

    render() {      
        const { users, classes, company, params: { companyId  } } = this.props;
        const { localCompany } = this.state;   
        const doneLoading = company.get('doneLoading');
        
        return (
            doneLoading ?
            <EditCompany
                company={localCompany === undefined ? company.get('company') : localCompany}
                users={users}
                companyId={companyId}
                onDropownChange={this.handleUserDropdownChange} 
                onSaveButtonClick={this.handleSaveButtonClick}
                onChange={this.handleChange}
            /> : null
        );
    }
}

EditCompanyContainer.propTypes = {
    users: PropTypes.instanceOf(Immutable.Iterable),
    company: PropTypes.instanceOf(Immutable.Map),
    params: PropTypes.object.isRequired,
};

EditCompanyContainer.defaultProps = {
    users: Immutable.List(),
    company: Immutable.Map({
        company: Immutable.Map({
            Id: '',
            CreatorId: '',
            Name: '',
            Email: '',
            Address: '',
            Telephone: '',
            Subscribers: Immutable.List(),
            Creator: {},
        }),
        isLoading: true,
        doneLoading: false,
    }),
};

export default connectToStores(EditCompanyContainer);