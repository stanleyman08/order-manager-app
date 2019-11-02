import React from 'react';

// @material-ui
import Paper from '@material-ui/core/Paper';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./tabPanel";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import withStyles from "@material-ui/core/styles/withStyles";
import WeeklyTabsStyles from "./weeklyTabsStyles";

class WeeklyTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTabIndex: 0
        }
    }

    toggleWeeklyTabs = (e, newValue) => {
        this.setState({currentTabIndex: newValue});
    };

    a11yProps = index => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    toggleAddEditForm = () => {
        const {toggleAddEditForm, isOpenAddEditForm } = this.props;
        toggleAddEditForm(isOpenAddEditForm);
    };

    render () {
        const { classes } = this.props;
        const { currentTabIndex } = this.state;
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return (
            <Paper >
                <Tabs value={currentTabIndex} onChange={this.toggleWeeklyTabs} indicatorColor="primary" textColor="primary">
                    {days.map((day, index) => {
                        return <Tab key={index} label={day} {...this.a11yProps(index)} />
                    })}
                </Tabs>
                <TabPanel value={currentTabIndex} index={0}>
                    Sunday
                </TabPanel>
                <TabPanel value={currentTabIndex} index={1}>
                    Monday
                </TabPanel>
                <TabPanel value={currentTabIndex} index={2}>
                    Tuesday
                </TabPanel>
                <TabPanel value={currentTabIndex} index={3}>
                    Wednesday
                </TabPanel>
                <TabPanel value={currentTabIndex} index={4}>
                    Thursday
                </TabPanel>
                <TabPanel value={currentTabIndex} index={5}>
                    Friday
                </TabPanel>
                <TabPanel value={currentTabIndex} index={6}>
                    Saturday
                </TabPanel>
                {days.map((day, index) => {
                    return (
                        <Zoom
                            key={index}
                            in={currentTabIndex === index}
                            timeout={classes.transitionDelay}
                            unmountOnExit
                        >
                            <Fab className={classes.fab} color="primary" onClick={this.toggleAddEditForm} >
                                <AddIcon />
                            </Fab>
                        </Zoom>
                    )
                })}
            </Paper>
        )
    }
}

export default withStyles(WeeklyTabsStyles)(WeeklyTabs)
