import HomeComponent from '../views/home/home';
import OrdersContainer from '../containers/ordersContainer';
import CustomersContainer from '../containers/customersContainer';
import WeeklyMenusComponent from '../views/menus/weeklyMenusViews';
import FoodsContainer from '../containers/foodsContainer';

import HomeIcon from '@material-ui/icons/Home';
import CustomerIcon from '@material-ui/icons/People';
import OrderIcon from '@material-ui/icons/Work';
import FoodsIcon from '@material-ui/icons/RestaurantMenu';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const appRoutes = [
    {
        path: '/app/home',
        icon: HomeIcon,
        sidebarName: 'Home',
        component: HomeComponent
    },
    {
        path: '/app/customers',
        icon: CustomerIcon,
        sidebarName: 'Customers',
        component: CustomersContainer
    },
    {
        path: '/app/orders',
        icon: OrderIcon,
        sidebarName: 'Orders',
        component: OrdersContainer
    },
    {
        path: '/app/weeklymenus',
        icon: MenuBookIcon,
        sidebarName: 'Weekly Menus',
        component: WeeklyMenusComponent
    },
    {
        path: '/app/foods',
        icon: FoodsIcon,
        sidebarName: 'Foods',
        component: FoodsContainer
    },
    { redirect: true, path: '/', to: '/app/home', sidebarName: 'Redirect' }
];

export default appRoutes;
