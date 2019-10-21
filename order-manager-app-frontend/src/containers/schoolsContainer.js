import { connect } from 'react-redux';
import React from "react";
import {bindActionCreators} from "redux";

import SchoolsViews from '../views/schools/schoolsViews';
import {
    createSchool,
    deleteSchool,
    getAllSchools,
    getSchoolsById,
    toggleAddEditForm,
    updateSchool
} from "../actions/schoolsAction";

class SchoolsContainer extends React.Component {
    componentDidMount(): void {
        this.props.getAllSchools();
    }

    render() {
        return (
            <SchoolsViews
                toggleAddEditForm={this.props.toggleAddEditForm}
                isOpenAddEditForm={this.props.isOpenAddEditForm}
                createSchool={this.props.createSchool}
                deleteSchool={this.props.deleteSchool}
                updateSchool={this.props.updateSchool}
                schoolsData={this.props.schoolsData}
            />
        )
    }
}

const mapStateToProps = state => ({
    isOpenAddEditForm: state.SchoolsReducer.isOpenAddEditForm,
    schoolsData: state.SchoolsReducer.schoolsData
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {toggleAddEditForm, getAllSchools, getSchoolsById, createSchool, deleteSchool, updateSchool},
        dispatch
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SchoolsContainer)
