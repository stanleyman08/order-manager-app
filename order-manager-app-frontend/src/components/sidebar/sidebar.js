import React from 'react';
import { NavLink } from "react-router-dom";

import SidebarStyles from './sidebarStyles';

//@material-ui/core
import Drawer from '@material-ui/core/Drawer';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';;

const Sidebar = (props) => {
    const { classes, appRoutes, navDrawerOpen, handleDrawerToggle } = props;
    const navLinks = (
        <List>
            {appRoutes.map((route, index) => {
                if (route.redirect) {
                    return null;
                } else {
                    return (
                        <NavLink to={route.path} key={index}>
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    <route.icon/>
                                </ListItemIcon>
                                <ListItemText className={classes.listItemText} primary={route.sidebarName}/>
                            </ListItem>
                        </NavLink>
                    )
                }
            })}
        </List>
    );
    return (
        <Drawer
            variant="permanent"
            open={navDrawerOpen}
            className={`${classes.drawer} ${navDrawerOpen ? classes.drawerOpen : classes.drawerClose}`}
            classes={{
                paper: navDrawerOpen ? classes.drawerOpen : classes.drawerClose
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerToggle}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            {navLinks}
        </Drawer>
    );
};
export default withStyles(SidebarStyles)(Sidebar);
