import React from 'react';

// @material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import withStyles from "@material-ui/core/styles/withStyles";

//Todo: OrdersAddEditForm
class SchoolsAddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleChange = (e) => {
        this.setState({name: e.target.value})
    };

    handleCreateSchool = e => {
        const { createSchool, toggleAddEditForm, isOpenAddEditForm } = this.props;
        const { name } = this.state;
        console.log("Creating school...");
        createSchool({name});
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
                <DialogTitle id="form-dialog-title">Add School</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={this.handleChange}
                        label="School Name"
                        type="text"
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleAddEditForm}>Cancel</Button>
                    <Button color="primary" onClick={this.handleCreateSchool}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
};

export default SchoolsAddEditForm
