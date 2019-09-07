import OrdersComponent from '../views/orders/orders';
import HomeComponent from '../views/home/home';
import Customers from '../views/customers/customers';
//
import HomeIcon from '@material-ui/icons/Home';
import CustomerIcon from '@material-ui/icons/People';
import OrderIcon from '@material-ui/icons/Work';

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
        component: Customers
    },
    {
        path: '/app/orders',
        icon: OrderIcon,
        sidebarName: 'Orders',
        component: OrdersComponent
    },
    { redirect: true, path: '/', to: '/app/home', navbarName: 'Redirect' }
];

export default appRoutes;
