import React from 'react';

// @material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";


//Todo: CustomersAddEditForm
class CustomersAddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            customerEmail: '',
            customerPhone: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value });
    };

    render() {
        const { isOpenAddEditForm, toggleAddEditForm } = this.props;
        const { name, email, phone } = this.state;
        return (
            <Dialog
                open={isOpenAddEditForm}
                onClose={toggleAddEditForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="customerEmail"
                        value={email}
                        onChange={this.handleChange}
                        label="Customer Email"
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="customerPhone"
                        value={phone}
                        onChange={this.handleChange}
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
    }
};

export default CustomersAddEditForm
