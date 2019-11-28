import React from 'react';
import Select, {components} from 'react-select';
import _ from 'lodash';

// @material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {DialogContentText} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {toggleAddEditForm} from "../../actions/foodsAction";

//Todo: WeeklyMenusAddEditForm
class WeeklyMenusAddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weeklyMenu: [
                {day: 'monday', menu: []},
                {day: 'tuesday', menu: []},
                {day: 'wednesday', menu: []},
                {day: 'thursday', menu: []},
                {day: 'friday', menu: []},
                {day: 'saturday', menu: []},
                {day: 'sunday', menu: []},
            ]
        }
    }

    //todo: might refactor this into redux
    handleChange = (value, e) => {
        const index = _.findIndex(this.state.weeklyMenu, {day: e.name});
        this.setState({
           weeklyMenu: [
               ...this.state.weeklyMenu.slice(0, index),
               Object.assign({}, this.state.weeklyMenu[index], {day: e.name, menu: value}),
               ...this.state.weeklyMenu.slice(index+1)
           ]
        });
    };

    handleCreateWeeklyMenu = () => {
        const {weeklyMenu} = this.state;
        const {
            toggleAddEditForm,
            isOpenAddEditForm,
            createWeeklyMenu,
            menuDate
        } = this.props;
        console.log(weeklyMenu);

        //convert weeklyMenu to an object that createWeeklyMenu can handle
        // example: {menuDate: date, "monday": [foodId]}
        let weeklyMenuObj = {menuDate: menuDate.toISOString()};
        weeklyMenu.forEach(menu => {
            weeklyMenuObj[menu.day] = _.map(menu.menu, (food) => {
                return food.foodId;
            });
        });

        // Need to check if menuDate is unique
        createWeeklyMenu(weeklyMenuObj);
        toggleAddEditForm(isOpenAddEditForm);
    };

    render() {
        const {
            isOpenAddEditForm,
            toggleAddEditForm,
            foodsData,
            menuDate
        } = this.props;
        const convertToSelectList = (food) => {
            return {value: food.dishName, label: food.dishName, foodId: food._id};
        };
        const foodsList = _.map(foodsData, convertToSelectList);

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        const formatOptionLabel = ({value, label}) => {
            return (
                <div onMouseEnter={this.handleTooltipOpen} onMouseLeave={this.handleTooltipClose}>
                    {value}
                </div>
            )
        };

        return (
            <Dialog
                open={isOpenAddEditForm}
                onClose={toggleAddEditForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Weekly Menu {menuDate.toString()}</DialogTitle>
                <DialogContent>
                    {this.state.weeklyMenu.map((day, index) => {
                        return (
                            <React.Fragment key={index}>
                                <DialogContentText>
                                    {day.day}
                                </DialogContentText>
                                <Select
                                    name={day.day}
                                    // components={{Option}}
                                    value={day.menu}
                                    onChange={this.handleChange}
                                    isClearable={true}
                                    isMulti
                                    isSearchable={true}
                                    classNamePrefix="select"
                                    options={foodsList}
                                    // formatOptionLabel={formatOptionLabel}
                                />
                            </React.Fragment>
                        )
                    })}
                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={this.handleCancel}>Cancel</Button>*/}
                    <Button color="primary" onClick={this.handleCreateWeeklyMenu}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default WeeklyMenusAddEditForm
