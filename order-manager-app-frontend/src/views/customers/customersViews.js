import React from 'react';

// @material-ui
import CardFooter from "../../components/Card/CardFooter";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomersStyles from "./customersStyles";

// Components
import CustomersDataTable from '../../components/customers/customersDataTable';
import CustomersAddEditForm from "../../components/customers/customersAddEditForm";

class CustomersViews extends React.Component {
    render() {
        const { classes, isOpenAddEditForm, toggleAddEditForm, customersData, createCustomer, deleteCustomer, updateCustomer } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Customers </h4>
                </CardHeader>
                <CardBody>
                    <CustomersDataTable
                        dataSource={customersData}
                        toggleAddEditForm={toggleAddEditForm}
                        isOpenAddEditForm={isOpenAddEditForm}
                        deleteCustomer={deleteCustomer}
                        updateCustomer={updateCustomer}
                    />
                    <CustomersAddEditForm
                        isOpenAddEditForm={isOpenAddEditForm}
                        toggleAddEditForm={toggleAddEditForm}
                        createCustomer={createCustomer}
                    />
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        )
    }
}

export default withStyles(CustomersStyles)(CustomersViews)
