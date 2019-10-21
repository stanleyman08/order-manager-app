import React from 'react';

// @material-ui
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import withStyles from "@material-ui/core/styles/withStyles";
import SchoolsStyles from "./schoolsStyles";

// components
import SchoolsDataTable from "../../components/schools/schoolsDataTable";
import SchoolsAddEditForm from "../../components/schools/schoolsAddEditForm";

class SchoolsViews extends React.Component {
    render() {
        const { classes, isOpenAddEditForm, toggleAddEditForm, schoolsData, deleteSchool, updateSchool, createSchool } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Schools </h4>
                </CardHeader>
                <CardBody>
                    <SchoolsDataTable
                        dataSource={schoolsData}
                        isOpenAddEditForm={isOpenAddEditForm}
                        toggleAddEditForm={toggleAddEditForm}
                        deleteSchool={deleteSchool}
                        updateSchool={updateSchool}
                    />
                    <SchoolsAddEditForm
                        isOpenAddEditForm={isOpenAddEditForm}
                        toggleAddEditForm={toggleAddEditForm}
                        createSchool={createSchool}
                    />
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        )
    }
}

export default withStyles(SchoolsStyles)(SchoolsViews)
