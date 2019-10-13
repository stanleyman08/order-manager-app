import React from 'react';

// @material-ui
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import withStyles from "@material-ui/core/styles/withStyles";

import WeeklyTabs from "../../components/weeklyMenus/weeklyTabs";

import Menus_styles from "./weeklyMenusStyles";
import WeeklyMenusAddEditForm from "../../components/weeklyMenus/weeklyMenusAddEditForm";
import WeeklyDatePicker from "../../components/dateTimePicker/weeklyDatePicker";

class WeeklyMenusViews extends React.Component {
    render() {
        const { classes, toggleAddEditForm, isOpenAddEditForm } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Weekly Menus </h4>
                </CardHeader>
                <CardBody>
                    <WeeklyDatePicker />
                    <WeeklyTabs toggleAddEditForm={toggleAddEditForm} isOpenAddEditForm={isOpenAddEditForm} />
                    <WeeklyMenusAddEditForm toggleAddEditForm={toggleAddEditForm} isOpenAddEditForm={isOpenAddEditForm} />
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        )
    }
}

export default withStyles(Menus_styles)(WeeklyMenusViews)
