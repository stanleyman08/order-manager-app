import React from 'react';

// @material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";


//Todo: CustomersAddEditForm
const CustomersAddEditForm = (props) => {
    // const handleChange = e => {
    //     this.setState({ name: e.target.value });
    // };
    return (
        <Dialog
            open={false}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="customerName"
                    value=""
                    // onChange={handleChange}
                    label="Customer Name"
                    type="text"
                    fullWidth
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="customerEmail"
                    value=""
                    // onChange={handleChange}
                    label="Customer Email"
                    type="text"
                    fullWidth
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="customerPhone"
                    value=""
                    // onChange={handleChange}
                    label="Customer Phone"
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
};

export default CustomersAddEditForm
