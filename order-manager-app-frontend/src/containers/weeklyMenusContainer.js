import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

import {getAllWeeklyMenus, toggleAddEditForm} from "../actions/weeklyMenusAction";
import WeeklyMenusViews from "../views/weeklyMenus/weeklyMenusViews";

class WeeklyMenusContainer extends React.Component {
    componentDidMount(): void {
        this.props.getAllWeeklyMenus();
    }

    render() {
        return (
            <WeeklyMenusViews toggleAddEditForm={this.props.toggleAddEditForm} isOpenAddEditForm={this.props.isOpenAddEditForm}/>
        )
    }
}

const mapStateToProps = state => ({
    isOpenAddEditForm: state.WeeklyMenusReducer.isOpenAddEditForm
});

const mapDispatchToProps = dispatch => ({
    toggleAddEditForm: bindActionCreators(toggleAddEditForm, dispatch),
    getAllWeeklyMenus: bindActionCreators(getAllWeeklyMenus, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeeklyMenusContainer)
