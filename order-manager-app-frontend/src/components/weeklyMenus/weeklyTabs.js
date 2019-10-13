import React from 'react';

// @material-ui
import Paper from '@material-ui/core/Paper';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./tabPanel";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";

const testData = [

];
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
    }

    render () {
        // const { toggleAddEditForm, isOpenAddEditForm } = this.props;
        const { currentTabIndex } = this.state;
        return (
            <Paper >
                <Tabs value={currentTabIndex} onChange={this.toggleWeeklyTabs} indicatorColor="primary" textColor="primary">
                    <Tab label="Sunday" {...this.a11yProps(0)} />
                    <Tab label="Monday" {...this.a11yProps(1)}/>
                    <Tab label="Tuesday" {...this.a11yProps(2)}/>
                    <Tab label="Wednesday" {...this.a11yProps(3)} />
                    <Tab label="Thursday" {...this.a11yProps(4)} />
                    <Tab label="Friday" {...this.a11yProps(5)} />
                    <Tab label="Saturday" {...this.a11yProps(6)} />
                    <IconButton onClick={this.toggleAddEditForm}>
                        <AddIcon/>
                    </IconButton>
                </Tabs>
                <TabPanel>
                    Item one
                </TabPanel>
            </Paper>
        )
    }
}

export default WeeklyTabs
