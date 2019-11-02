import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

import {getAllWeeklyMenus, toggleAddEditForm} from "../actions/weeklyMenusAction";
import {getAllFoods} from "../actions/foodsAction";
import WeeklyMenusViews from "../views/weeklyMenus/weeklyMenusViews";

class WeeklyMenusContainer extends React.Component {
    componentDidMount(): void {
        this.props.getAllFoods();
        // this.props.getAllWeeklyMenus();
    }

    render() {
        return (
            <WeeklyMenusViews
                toggleAddEditForm={this.props.toggleAddEditForm}
                isOpenAddEditForm={this.props.isOpenAddEditForm}
                foodsData={this.props.foodsData}
            />
        )
    }
}

const mapStateToProps = state => ({
    isOpenAddEditForm: state.WeeklyMenusReducer.isOpenAddEditForm,
    foodsData: state.FoodsReducer.foodsData
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { toggleAddEditForm, getAllWeeklyMenus, getAllFoods },
        dispatch
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeeklyMenusContainer)
