import React from 'react';

// @material-ui
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import withStyles from "@material-ui/core/styles/withStyles";
import OrdersStyles from "./ordersStyles";

// components
import Table from '../../components/table/table';
import OrdersAddEditForm from "../../components/orders/ordersAddEditForm";

const orderData = [
    {Name: 'Richmond secondary'},
    {Name: 'Windermere secondary'},
    {Name: 'Grenfell elementary'}
];
class OrdersViews extends React.Component {
    render() {
        const { classes, toggleAddEditForm, isOpenAddEditForm } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Orders </h4>
                </CardHeader>
                <CardBody>
                    <Table dataSource={orderData} toggleAddEditForm={toggleAddEditForm} isOpenAddEditForm={isOpenAddEditForm} />
                    <OrdersAddEditForm toggleAddEditForm={toggleAddEditForm} isOpenAddEditForm={isOpenAddEditForm} />
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        )
    }
}

export default withStyles(OrdersStyles)(OrdersViews)
