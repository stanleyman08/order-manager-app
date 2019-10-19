import { connect } from 'react-redux';
import React from "react";
import {bindActionCreators} from "redux";

import FoodsViews from '../views/foods/foodsViews';
import {createFood, deleteFood, getAllFoods, getFoodsById, toggleAddEditForm, updateFood} from "../actions/foodsAction";

class FoodsContainer extends React.Component {
    componentDidMount(): void {
        this.props.getAllFoods();
    }

    render() {
        return (
            <FoodsViews
                toggleAddEditForm={this.props.toggleAddEditForm}
                isOpenAddEditForm={this.props.isOpenAddEditForm}
                createFood={this.props.createFood}
                deleteFood={this.props.deleteFood}
                updateFood={this.props.updateFood}
                foodsData={this.props.foodsData}
            />
        )
    }
}

const mapStateToProps = state => ({
    isOpenAddEditForm: state.FoodsReducer.isOpenAddEditForm,
    foodsData: state.FoodsReducer.foodsData
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {toggleAddEditForm, getAllFoods, getFoodsById, createFood, deleteFood, updateFood},
        dispatch
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodsContainer)
