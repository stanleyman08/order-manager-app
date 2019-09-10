import React from 'react';

// @material-ui
import CardFooter from "../../components/Card/CardFooter";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomersStyles from "./customersStyles";

// Components
import Table from '../../components/table/table';
import CustomersAddEditForm from "../../components/customers/customersAddEditForm";

//TODO: get data with api call to external source
const customerData = [
    {Name: 'Richmond secondary'},
    {Name: 'Windermere secondary'},
    {Name: 'Grenfell elementary'}
    ];

class CustomersViews extends React.Component {
    render() {
        const { classes, isOpenAddEditForm, toggleAddEditForm } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Customers </h4>
                </CardHeader>
                <CardBody>
                    <Table dataSource={customerData} toggleAddEditForm={toggleAddEditForm} isOpenAddEditForm={isOpenAddEditForm} />
                    <CustomersAddEditForm isOpenAddEditForm={isOpenAddEditForm} toggleAddEditForm={toggleAddEditForm} />
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        )
    }
}

export default withStyles(CustomersStyles)(CustomersViews)
