import React from 'react';

// @material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "../CustomButtons/Button";


//Todo: OrdersAddEditForm
class FoodsAddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: '',
            dishName: '',
            priceSmall: '',
            priceMedium: '',
            priceLarge: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value });
    };

    render() {
        const { isOpenAddEditForm, toggleAddEditForm } = this.props;
        const { photo, dishName, priceSmall, priceMedium, priceLarge } = this.state;
        return (
            <Dialog
                open={isOpenAddEditForm}
                onClose={toggleAddEditForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Food</DialogTitle>
                {/*<DialogContent>*/}
                {/*    <TextField*/}
                {/*        autoFocus*/}
                {/*        margin="dense"*/}
                {/*        id="photo"*/}
                {/*        onChange={this.handleChange}*/}
                {/*        label="Photo"*/}
                {/*        type="text"*/}
                {/*        fullWidth*/}
                {/*        required*/}
                {/*    />*/}
                {/*</DialogContent>*/}
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
                <DialogActions>
                    <Button>Cancel</Button>
                    <Button color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
};

export default FoodsAddEditForm
