import React from 'react';

// @material-ui
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import withStyles from "@material-ui/core/styles/withStyles";
import FoodsStyles from "./foodsStyles";

// Components
import FoodsDataTable from "../../components/table/foodsDataTable";
import FoodsAddEditForm from "../../components/foods/foodsAddEditForm";

const foodData = [
    {photo: 'n/a', dishName: 'Rice adfassdfa', priceSmall: 5, priceMedium: 10, priceLarge: 15},
    {photo: 'n/a', dishName: 'Noodle', priceSmall: 5, priceMedium: 10, priceLarge: 15},
    {photo: 'n/a', dishName: 'BLAH', priceSmall: 5, priceMedium: 10, priceLarge: 15}
];

class FoodsViews extends React.Component {
    render() {
        const { classes, isOpenAddEditForm, toggleAddEditForm } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Foods </h4>
                </CardHeader>
                <CardBody>
                    <FoodsDataTable dataSource={foodData} isOpenAddEditForm={isOpenAddEditForm} toggleAddEditForm={toggleAddEditForm} />
                    <FoodsAddEditForm isOpenAddEditForm={isOpenAddEditForm} toggleAddEditForm={toggleAddEditForm} />
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        )
    }
}

export default withStyles(FoodsStyles)(FoodsViews)
