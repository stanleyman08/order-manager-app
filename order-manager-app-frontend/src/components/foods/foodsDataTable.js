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
import SortArrow from '@material-ui/icons/ArrowUpward';
// import withStyles from "@material-ui/core/styles/withStyles";

const FoodsDataTable = (props) => {
    const { dataSource, isOpenAddEditForm, toggleAddEditForm, deleteFood, updateFood } = props;
    return (
        <MaterialTable
            columns={[
                //todo: add photo to data
                // {title: 'Photo', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} alt={'imageUrl'} />},
                {title: 'Dish Name', field: 'dishName'},
                {title: 'Price(S)', field: 'priceSmall', cellStyle: {width: 20, maxWidth: 20}},
                {title: 'Price(M)', field: 'priceMedium', cellStyle: {width: 20, maxWidth: 20}},
                {title: 'Price(L)', field: 'priceLarge', cellStyle: {width: 20, maxWidth: 20}}
            ]}
            data={dataSource}
            options={{
                showTitle: false,
                actionsColumnIndex: -1
            }}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            console.log('editing id: ' + oldData._id);
                            updateFood(oldData._id, newData);
                            resolve();
                        }, 1000);
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            console.log('deleting id: ' + oldData._id);
                            deleteFood(oldData._id);
                            resolve();
                        }, 1000);
                    })
            }}
            actions={[
                {
                    icon: Add,
                    tooltip: 'Add Food',
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
                Edit,
                SortArrow
            }}
        />
    )
};

FoodsDataTable.propTypes = {
    dataSource: PropTypes.arrayOf(Object).isRequired
};

export default FoodsDataTable
