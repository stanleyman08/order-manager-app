import React from 'react';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import withStyles from "@material-ui/core/styles/withStyles";

import Orders_styles from "./orders_styles";

class Orders extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Orders </h4>
                </CardHeader>
                <CardBody>

                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        )
    }
}

export default withStyles(Orders_styles)(Orders)
