import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import appRoutes from "../routes/app";

// @material-ui
import {CssBaseline} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

// components
import Appbar from "../components/appbar/appbar";
import Sidebar from "../components/sidebar/sidebar";

import App_styles from "./app_styles";

const switchRoutes = (
    <Switch>
        {appRoutes.map((prop, key) => {
            console.log(prop);
            if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.to} key={key} />;
            }
            return <Route path={prop.path} component={prop.component} key={key} />;
        })}
    </Switch>
);

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navDrawerOpen: true
        }
    }

    handleDrawerToggle = () => {
        this.setState({ navDrawerOpen: !this.state.navDrawerOpen });
        console.log("toggle drawer:" + this.state.navDrawerOpen);
    };

    render() {
        const { classes } = this.props;
        const { navDrawerOpen } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Appbar
                    navDrawerOpen={navDrawerOpen}
                    handleDrawerToggle={this.handleDrawerToggle}
                />
                <Sidebar
                    appRoutes={appRoutes}
                    navDrawerOpen={navDrawerOpen}
                    handleDrawerToggle={this.handleDrawerToggle}
                />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div>
                        {switchRoutes}
                    </div>
                </main>
            </div>
        )
    }
}

export default withStyles(App_styles)(App);
