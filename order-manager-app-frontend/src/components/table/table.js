import React from 'react';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';
import Search from '@material-ui/icons/Search';
import ResetSearch from '@material-ui/icons/Clear';
import Clear from '@material-ui/icons/Clear';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import NextPage from '@material-ui/icons/ChevronRight';
import PreviousPage from '@material-ui/icons/ChevronLeft';
import Delete from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import ThirdStateCheck from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
// import withStyles from "@material-ui/core/styles/withStyles";

const Table = (props) => {
    const { dataSource, isOpenAddEditForm, toggleAddEditForm } = props;
    return (
        <MaterialTable
            columns={[{title: 'Name', field: 'Name'}]}
            data={dataSource}
            options={{
                showTitle: false,
                actionsColumnIndex: -1
            }}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            console.log('edit'); //todo: edit existing customer
                            resolve();
                        }, 1000);
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            console.log('delete'); //todo: delete existing customer
                            resolve();
                        }, 1000);
                    })
            }}
            actions={[
                {
                    icon: Add,
                    tooltip: 'Add Customer',
                    isFreeAction: true,
                    onClick: (event) => toggleAddEditForm(isOpenAddEditForm)
                }
            ]}
            icons={{
                Search,
                ResetSearch,
                FirstPage,
                LastPage,
                NextPage,
                PreviousPage,
                Delete,
                Check,
                ThirdStateCheck,
                Clear,
                Edit
            }}
        />
    )
};

Table.propTypes = {
    dataSource: PropTypes.arrayOf(Object).isRequired
};

export default Table
