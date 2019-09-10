import HomeComponent from '../views/home/home';
import OrdersContainer from '../containers/ordersContainer';
import CustomersContainer from '../containers/customersContainer';
import MenusComponent from '../views/menus/menus';

import HomeIcon from '@material-ui/icons/Home';
import CustomerIcon from '@material-ui/icons/People';
import OrderIcon from '@material-ui/icons/Work';
import MenuIcon from '@material-ui/icons/RestaurantMenu';

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
        path: '/app/menus',
        icon: MenuIcon,
        sidebarName: 'Menus',
        component: MenusComponent
    },
    { redirect: true, path: '/', to: '/app/home', navbarName: 'Redirect' }
];

export default appRoutes;
