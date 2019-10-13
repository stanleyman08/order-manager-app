import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, history } from './store/configureStore';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

import './index.css';
import Root from './containers/root';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <Root store={store} history={history} />
    </MuiPickersUtilsProvider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
