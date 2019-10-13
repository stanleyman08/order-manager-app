import React from 'react';

// @material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

//Todo: WeeklyMenusAddEditForm
class WeeklyMenusAddEditForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpenAddEditForm, toggleAddEditForm } = this.props;

        return (
            <Dialog
                open={isOpenAddEditForm}
                onClose={toggleAddEditForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Weekly Menu</DialogTitle>
                <DialogContent>
                    something here
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
}

export default WeeklyMenusAddEditForm
