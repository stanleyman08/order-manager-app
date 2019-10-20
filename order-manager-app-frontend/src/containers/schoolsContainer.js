import { connect } from 'react-redux';
import React from "react";
import {bindActionCreators} from "redux";

import SchoolsViews from '../views/schools/schoolsViews';
import { toggleAddEditForm } from "../actions/schoolsAction";

class SchoolsContainer extends React.Component {
    render() {
        return (
            <SchoolsViews
                toggleAddEditForm={this.props.toggleAddEditForm}
                isOpenAddEditForm={this.props.isOpenAddEditForm}
            />
        )
    }
}

const mapStateToProps = state => ({
    isOpenAddEditForm: state.SchoolsReducer.isOpenAddEditForm
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {toggleAddEditForm},
        dispatch
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SchoolsContainer)
