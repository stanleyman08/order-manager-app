import HomeComponent from '../views/home/home';
import OrdersContainer from '../containers/ordersContainer';
import CustomersContainer from '../containers/customersContainer';
import FoodsContainer from '../containers/foodsContainer';
import WeeklyMenusContainer from '../containers/weeklyMenusContainer';
import SchoolsContainer from '../containers/schoolsContainer';

import HomeIcon from '@material-ui/icons/Home';
import CustomerIcon from '@material-ui/icons/People';
import OrderIcon from '@material-ui/icons/Work';
import FoodsIcon from '@material-ui/icons/RestaurantMenu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SchoolsIcon from '@material-ui/icons/School';

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
        component: WeeklyMenusContainer
    },
    {
        path: '/app/foods',
        icon: FoodsIcon,
        sidebarName: 'Foods',
        component: FoodsContainer
    },
    {
        path: '/app/schools',
        icon: SchoolsIcon,
        sidebarName: 'Schools',
        component: SchoolsContainer
    },
    { redirect: true, path: '/', to: '/app/home', sidebarName: 'Redirect' }
];

export default appRoutes;
