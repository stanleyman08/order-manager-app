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

class FoodsViews extends React.Component {
    render() {
        const { classes, isOpenAddEditForm, toggleAddEditForm, foodsData, createFood, deleteFood, updateFood } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Foods </h4>
                </CardHeader>
                <CardBody>
                    <FoodsDataTable
                        dataSource={foodsData}
                        isOpenAddEditForm={isOpenAddEditForm}
                        toggleAddEditForm={toggleAddEditForm}
                        deleteFood={deleteFood}
                        updateFood={updateFood}
                    />
                    <FoodsAddEditForm
                        isOpenAddEditForm={isOpenAddEditForm}
                        toggleAddEditForm={toggleAddEditForm}
                        createFood={createFood}
                    />
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        )
    }
}

export default withStyles(FoodsStyles)(FoodsViews)
