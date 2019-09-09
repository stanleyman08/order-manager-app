import React from 'react';

// @material-ui
import CardFooter from "../../components/Card/CardFooter";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import withStyles from "@material-ui/core/styles/withStyles";
import Customers_styles from "./customers_styles";

// Components
import Table from '../../components/table/table';
import CustomersAddEditForm from "../../components/customers/customersAddEditForm";

//TODO: get data with api call to external source
const customerData = [
    {Name: 'Richmond secondary'},
    {Name: 'Windermere secondary'},
    {Name: 'Grenfell elementary'}
    ];

class Customers extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Customers </h4>
                </CardHeader>
                <CardBody>
                    <Table dataSource={customerData} />
                    <CustomersAddEditForm />
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        )
    }
}

export default withStyles(Customers_styles)(Customers)
