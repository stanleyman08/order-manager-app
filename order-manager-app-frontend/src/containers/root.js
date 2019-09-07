import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import indexRoutes from "../routes";

export default class Root extends React.Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        {indexRoutes.map((prop, key) => (
                            <Route
                                history={history}
                                path={prop.path}
                                component={prop.component}
                                key={key}
                            />
                        ))}
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}
