import React from 'react';

// @material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


//Todo: CustomersAddEditForm
class CustomersAddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.id]: e.target.value });
    };

    handleCreateCustomer = e => {
        const { createCustomer, toggleAddEditForm, isOpenAddEditForm } = this.props;
        const { name, email, phone } = this.state;
        console.log("Creating customer...");
        createCustomer({name, email, phone});
        toggleAddEditForm(isOpenAddEditForm);
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
                        id="name"
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
                        id="email"
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
                        id="phone"
                        value={phone}
                        onChange={this.handleChange}
                        label="Customer Phone"
                        type="text"
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleAddEditForm}>Cancel</Button>
                    <Button onClick={this.handleCreateCustomer} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
};

export default CustomersAddEditForm
