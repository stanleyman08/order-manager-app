// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { CustomersReducer } from './customersReducer';
import { OrdersReducer } from './ordersReducer';
import { FoodsReducer} from "./foodsReducer";
import { WeeklyMenusReducer } from "./weeklyMenusReducer";
import { SchoolsReducer } from "./schoolsReducer";

export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        CustomersReducer,
        OrdersReducer,
        FoodsReducer,
        WeeklyMenusReducer,
        SchoolsReducer
    });
}
