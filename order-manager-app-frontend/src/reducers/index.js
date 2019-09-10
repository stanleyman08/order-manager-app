// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { CustomersReducer } from './customersReducer';
import { OrdersReducer } from './ordersReducer';

export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        CustomersReducer,
        OrdersReducer
    });
}
