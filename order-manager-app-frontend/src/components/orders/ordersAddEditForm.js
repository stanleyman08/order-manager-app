import React from 'react';

// @material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";


//Todo: OrdersAddEditForm
class OrdersAddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value });
    };

    render() {
        const { isOpenAddEditForm, toggleAddEditForm } = this.props;
        const { name } = this.state;
        return (
            <Dialog
                open={isOpenAddEditForm}
                onClose={toggleAddEditForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="customerName"
                        value={name}
                        onChange={this.handleChange}
                        label="Customer Name"
                        type="text"
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={this.handleCancel}>Cancel</Button>*/}
                    {/*<Button onClick={this.handleAdd} color="primary">*/}
                    {/*    Add*/}
                    {/*</Button>*/}
                </DialogActions>
            </Dialog>
        )
    }
};

export default OrdersAddEditForm
