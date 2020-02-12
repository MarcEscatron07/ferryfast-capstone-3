import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import { Toast } from './ToastAuth';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getBookingsQuery } from '../../../client-queries/queries';
import {
    createBookingMutation, 
    updateBookingMutation, 
    deleteBookingMutation 
} from '../../../client-queries/mutations';

import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
  
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const ToastComponent = (iconProp, titleProp) => {
    Toast.fire({
        icon: iconProp,
        title: titleProp,
        showClass: {
            popup: 'animated fadeInRight faster'
        },
        hideClass: {
            popup: 'animated fadeOutRight faster'
        }
    });
}

function BookingsPage(props) {
    const [bookingPage, setBookingPage] = useState(0);
    const [bookingRowsPerPage, setBookingRowsPerPage] = useState(10);
    const [bookingRows, setBookingRows] = useState({
        data: []
    })

    let history = useHistory();
    const classes = useStyles();
    let dataObject = props.data;

    const bookingColumns = [        
        { id: 'id', label: 'ID', minWidth: 110, align: 'center' },
        { id: 'bookingNumber', label: 'Booking No.', minWidth: 100, align: 'center' },
        { id: 'bookingDate', label: 'Booking Date', minWidth: 100, align: 'center' },
        { id: 'originId', label: 'Origin', minWidth: 80, align: 'center' },
        { id: 'destinationId', label: 'Destination', minWidth: 100, align: 'center' },
        { id: 'dateId', label: 'Date Schedule', minWidth: 110, align: 'center' },
        { id: 'timeId', label: 'Time Schedule', minWidth: 110, align: 'center' },
        { id: 'accommodationId', label: 'Accommodation', minWidth: 100, align: 'center' },
        { id: 'statId', label: 'Status', minWidth: 80, align: 'center' },
        { id: 'passengerQuantity', label: 'Pax', minWidth: 50, align: 'center' },
        { id: 'totalPayment', label: 'Total Due', minWidth: 80, align: 'center' },
    ];

    useEffect(() => {
    	if(dataObject.loading === false && dataObject.error === undefined){
            if(dataObject.getBookings !== null){
                let bookingsArray = dataObject.getBookings;
    
                setBookingRows({...bookingRows, data: []});
                bookingsArray.forEach(boArr => {
                    setBookingRows(prevState => {                    
                        const data = [...prevState.data];
                        data.push({
                            id: boArr.id,
                            bookingNumber: boArr.bookingNumber,
                            bookingDate: boArr.bookingDate,
                            originId: boArr.originId,
                            destinationId: boArr.destinationId,
                            dateId: boArr.dateId,
                            timeId: boArr.timeId,
                            accommodationId: boArr.accommodationId,
                            statId: boArr.statId,
                            passengerQuantity: boArr.passengerQuantity,
                            totalPayment: boArr.totalPayment
                        });
                        return { ...prevState, data };
                    });
                });
            }
    	}

    	if(dataObject.error !== undefined){
            Swal.fire({
                icon: "error",
                timer: 2200,
                title: "Failed to load data!"
            })
        }
    },[dataObject])

    const handleBreadCrumbClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'home'){
            history.push('/admin/home');
        }
    }

    const handleBookingChangePage = (event, newPage) => {
        setBookingPage(newPage);
    }

    const handleBookingChangeRowsPerPage = event => {
        setBookingRowsPerPage(+event.target.value);
        setBookingPage(0);
    }    

    return (
        <>
        	<Breadcrumbs aria-label="breadcrumb" className="mb-3">
                <Link id="home" color="inherit" href="/" onClick={handleBreadCrumbClick} className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Home
                </Link>   
                <Typography color="textPrimary" className={classes.link}>            
                    Bookings
                </Typography>
            </Breadcrumbs>
            <div className="container-fluid p-0">
            	<div className="row">
                    <div className="col">
                    	<Typography className="mb-2" variant="h6" component="h1">
                            Bookings
                        </Typography>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {bookingColumns.map((column,index) => (
                                            <TableCell
                                            className="font-weight-bold"
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            hidden={index === 0 ? true:false}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bookingRows.data.slice(bookingPage * bookingRowsPerPage, bookingPage * bookingRowsPerPage + bookingRowsPerPage).map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {bookingColumns.map((column,index) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align} hidden={index === 0 ? true:false}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                            </TableRow>
                                        );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={bookingRows.data.length}
                                rowsPerPage={bookingRowsPerPage}
                                page={bookingPage}
                                onChangePage={handleBookingChangePage}
                                onChangeRowsPerPage={handleBookingChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default compose(
    graphql(getBookingsQuery),
    graphql(createBookingMutation, {name: 'createBooking'}),
    graphql(updateBookingMutation, {name: 'updateBooking'}),
    graphql(deleteBookingMutation, {name: 'deleteBooking'})
)(BookingsPage);
