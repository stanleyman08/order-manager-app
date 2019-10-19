import React from 'react';

// @material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";

import withStyles from "@material-ui/core/styles/withStyles";
import FoodsAddEditFormStyles from "./foodsAddEditFormStyles";

//Todo: OrdersAddEditForm
class FoodsAddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dishName: '',
            priceSmall: '',
            priceMedium: '',
            priceLarge: ''
        }
    }

    handleChange = (e) => {
        //todo: add photoUrl
        if (e.currentTarget.files) {
            // photo selected
            console.log(e.currentTarget.files[0]);
        } else {
            this.setState({[e.target.id]: e.target.value });
        }
    };

    handleCreateFood = e => {
        const { createFood, toggleAddEditForm, isOpenAddEditForm } = this.props;
        const { dishName, priceSmall, priceMedium, priceLarge } = this.state;
        console.log("Creating food...");
        createFood({dishName, priceSmall, priceMedium, priceLarge});
        toggleAddEditForm(isOpenAddEditForm);
    };

    render() {
        const { classes, isOpenAddEditForm, toggleAddEditForm } = this.props;
        return (
            <Dialog
                open={isOpenAddEditForm}
                onClose={toggleAddEditForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Food</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="dishName"
                        onChange={this.handleChange}
                        label="Dish Name"
                        type="text"
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="priceSmall"
                        onChange={this.handleChange}
                        label="Price(S)"
                        type="text"
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="priceMedium"
                        onChange={this.handleChange}
                        label="Price(M)"
                        type="text"
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="priceLarge"
                        onChange={this.handleChange}
                        label="Price(L)"
                        type="text"
                        fullWidth
                        required
                    />
                </DialogContent>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    className={classes.input}
                    type="file"
                    onChange={this.handleChange}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        component="span"
                        variant="contained"
                        color="default"
                        startIcon={<CloudUploadIcon/>}
                    >
                        Upload food photo
                    </Button>
                </label>
                <DialogActions>
                    <Button onClick={toggleAddEditForm}>Cancel</Button>
                    <Button color="primary" onClick={this.handleCreateFood}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
};

export default withStyles(FoodsAddEditFormStyles)(FoodsAddEditForm)
