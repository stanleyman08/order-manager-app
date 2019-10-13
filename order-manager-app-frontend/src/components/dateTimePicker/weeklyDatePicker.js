import React from 'react';
import clsx from "clsx";

// @material-ui/pickers
import { DatePicker } from "@material-ui/pickers";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import isSameDay from "date-fns/isSameDay";
import endOfWeek from "date-fns/endOfWeek";
import startOfWeek from "date-fns/startOfWeek";
import isWithinInterval from "date-fns/isWithinInterval";
import { makeJSDateObject } from "../../utils/helpers";

import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import WeeklyDatePickerStyles from "./weeklyDatePickerStyles";

class WeeklyDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date()
        }
    }

    handleWeekChange = date => {
        this.setState({ selectedDate: startOfWeek(makeJSDateObject(date)) });
    };

    renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
        const { classes } = this.props;
        let dateClone = makeJSDateObject(date);
        let selectedDateClone = makeJSDateObject(selectedDate);

        const start = startOfWeek(selectedDateClone);
        const end = endOfWeek(selectedDateClone);

        const dayIsBetween = isWithinInterval(dateClone, { start, end });
        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
        });

        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span> {format(dateClone, "d")} </span>
                </IconButton>
            </div>
        );
    };

    formatWeekSelectLabel = (date, invalidLabel) => {
        let dateClone = makeJSDateObject(date);

        return dateClone && isValid(dateClone)
            ? `Week of ${format(startOfWeek(dateClone), "MMM do")}`
            : invalidLabel;
    };

    render() {
        const { selectedDate } = this.state;
        return (
            <DatePicker
                value={selectedDate}
                onChange={this.handleWeekChange}
                renderDay={this.renderWrappedWeekDay}
                labelFunc={this.formatWeekSelectLabel}
            />
        )
    }
}

export default withStyles(WeeklyDatePickerStyles)(WeeklyDatePicker)
