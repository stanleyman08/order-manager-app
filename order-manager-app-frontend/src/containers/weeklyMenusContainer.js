import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

import {
    getAllWeeklyMenus,
    getWeeklyMenusByDate,
    toggleAddEditForm,
    createWeeklyMenu,
    setWeeklyMenusDate
} from "../actions/weeklyMenusAction";
import {getAllFoods} from "../actions/foodsAction";
import WeeklyMenusViews from "../views/weeklyMenus/weeklyMenusViews";

class WeeklyMenusContainer extends React.Component {
    componentDidMount(): void {
        this.props.getAllFoods();
    }

    render() {
        return (
            <WeeklyMenusViews
                toggleAddEditForm={this.props.toggleAddEditForm}
                isOpenAddEditForm={this.props.isOpenAddEditForm}
                foodsData={this.props.foodsData}
                createWeeklyMenu={this.props.createWeeklyMenu}
                setWeeklyMenusDate={this.props.setWeeklyMenusDate}
                getWeeklyMenusByDate={this.props.getWeeklyMenusByDate}
                menuDate={this.props.menuDate}
            />
        )
    }
}

const mapStateToProps = state => ({
    isOpenAddEditForm: state.WeeklyMenusReducer.isOpenAddEditForm,
    foodsData: state.FoodsReducer.foodsData,
    menuDate: state.WeeklyMenusReducer.menuDate
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            toggleAddEditForm,
            getAllFoods,
            createWeeklyMenu,
            setWeeklyMenusDate,
            getWeeklyMenusByDate
        },
        dispatch
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeeklyMenusContainer)
