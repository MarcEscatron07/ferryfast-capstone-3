import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import { Toast } from './ToastAuth';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getPassengersAndContactsQuery } from '../../../client-queries/queries';
import {
    createContactMutation, 
    deleteContactMutation, 
    updateContactMutation,
    createPassengerMutation, 
    deletePassengerMutation, 
    updatePassengerMutation   
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

function PassengersAndContactsPage(props) {    
    const [passengerPage, setPassengerPage] = useState(0);
    const [passengerRowsPerPage, setPassengerRowsPerPage] = useState(10);
    const [passengerRows, setPassengerRows] = useState({
        data: []
    })

    const [contactPage, setContactPage] = useState(0);
    const [contactRowsPerPage, setContactRowsPerPage] = useState(10);
    const [contactRows, setContactRows] = useState({
        data: []
    })

    let history = useHistory();
    const classes = useStyles();
    let dataObject = props.data;

    const passengerColumns = [
        { id: 'firstname', label: 'First Name', minWidth: 110 },
        { id: 'middleinitial', label: 'M.I.', minWidth: 50, align: 'center' },
        { id: 'lastname', label: 'Last Name', minWidth: 110, align: 'center' },
        { id: 'age', label: 'Age', minWidth: 50, align: 'center' },
        { id: 'gender', label: 'Gender', minWidth: 100, align: 'center' },
        { id: 'seatId', label: 'Seat No.', minWidth: 80, align: 'center' },
        { id: 'contactId', label: 'Contact Ref.', minWidth: 110, align: 'center' },
        { id: 'bookingId', label: 'Booking No.', minWidth: 110, align: 'center' }
    ];

    const contactColumns = [
        { id: 'fullname', label: 'Full Name', minWidth: 110, align: 'center' },
        { id: 'phone', label: 'Phone No.', minWidth: 110, align: 'center' },
        { id: 'email', label: 'Email', minWidth: 110, align: 'center' },
        { id: 'address', label: 'Address', minWidth: 110, align: 'center' },
    ];

    useEffect(() => {
        if(dataObject.loading === false && dataObject.error === undefined){
            let passengersArray = dataObject.getPassengers;
            let contactsArray = dataObject.getContacts;

            setPassengerRows({...passengerRows, data: []});
            passengersArray.forEach(paArr => {
                setPassengerRows(prevState => {                    
                    const data = [...prevState.data];
                    data.push({
                        id: paArr.id,
                        firstname: paArr.firstname,
                        middleinitial: paArr.middleinitial,
                        lastname: paArr.lastname,
                        age: paArr.age,
                        gender: paArr.gender,
                        seatId: paArr.seat.row+paArr.seat.column,
                        contactId: paArr.contact.fullname,
                        bookingId: paArr.bookingId
                    });
                    return { ...prevState, data };
                });
            });

            setContactRows({...contactRows, data: []});
            contactsArray.forEach(coArr => {
                setContactRows(prevState => {                    
                    const data = [...prevState.data];
                    data.push({
                        id: coArr.id,
                        fullname: coArr.fullname,
                        phone: coArr.phone,
                        email: coArr.email,
                        address: coArr.address                        
                    });
                    return { ...prevState, data };
                });
            });
        }

        if(dataObject.error !== undefined){
            Swal.fire({
                icon: "error",
                timer: 2200,
                title: "Failed to load data!"
            })
        }
    },[dataObject]);

    const handleBreadCrumbClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'home'){
            history.push('/admin/home');
        }
    }

    const handlePassengerChangePage = (event, newPage) => {
        setPassengerPage(newPage);
    }

    const handlePassengerChangeRowsPerPage = event => {
        setPassengerRowsPerPage(+event.target.value);
        setPassengerPage(0);
    }

    const handleContactChangePage = (event, newPage) => {
        setContactPage(newPage);
    }

    const handleContactChangeRowsPerPage = event => {
        setContactRowsPerPage(+event.target.value);
        setContactPage(0);
    }    

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className="mb-3">
                <Link id="home" color="inherit" href="/" onClick={handleBreadCrumbClick} className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Home
                </Link>   
                <Typography color="textPrimary" className={classes.link}>            
                    Passengers & Contacts
                </Typography>
            </Breadcrumbs>
            <div className="container-fluid p-0">
                <div className="row mb-3">
                    <div className="col">
                        <Typography className="mb-2" variant="h6" component="h1">
                            Passengers
                        </Typography>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {passengerColumns.map(column => (
                                            <TableCell
                                            className="font-weight-bold"
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {passengerRows.data.slice(passengerPage * passengerRowsPerPage, passengerPage * passengerRowsPerPage + passengerRowsPerPage).map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {passengerColumns.map(column => {
                                                const value = row[column.id];
                                                return (
                                                <TableCell key={column.id} align={column.align}>
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
                                count={passengerRows.data.length}
                                rowsPerPage={passengerRowsPerPage}
                                page={passengerPage}
                                onChangePage={handlePassengerChangePage}
                                onChangeRowsPerPage={handlePassengerChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Typography className="mb-2" variant="h6" component="h1">
                            Contact References
                        </Typography>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {contactColumns.map(column => (
                                            <TableCell
                                            className="font-weight-bold"
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {contactRows.data.slice(contactPage * contactRowsPerPage, contactPage * contactRowsPerPage + contactRowsPerPage).map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {contactColumns.map(column => {
                                                const value = row[column.id];
                                                return (
                                                <TableCell key={column.id} align={column.align}>
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
                                count={contactRows.data.length}
                                rowsPerPage={contactRowsPerPage}
                                page={contactPage}
                                onChangePage={handleContactChangePage}
                                onChangeRowsPerPage={handleContactChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default compose(
    graphql(getPassengersAndContactsQuery),
    graphql(createContactMutation, {name: 'createContact'}),
    graphql(updateContactMutation, {name: 'updateContact'}),
    graphql(deleteContactMutation, {name: 'deleteContact'}),
    graphql(createPassengerMutation, {name: 'createPassenger'}),
    graphql(updatePassengerMutation, {name: 'updatePassenger'}),
    graphql(deletePassengerMutation, {name: 'deletePassenger'})
)(PassengersAndContactsPage);
