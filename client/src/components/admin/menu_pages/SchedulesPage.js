import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import { Toast } from './ToastAuth';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getSchedulesQuery } from '../../../client-queries/queries';
import { 
    createDateScheduleMutation,
    updateDateScheduleMutation,
    deleteDateScheduleMutation,
    createTimeScheduleMutation,
    updateTimeScheduleMutation,
    deleteTimeScheduleMutation,
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

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import AddBoxIcon from '@material-ui/icons/AddBox';
  
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    textField: {
        minWidth: 150,
    }
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

function SchedulesPage(props) {
    const [datePage, setDatePage] = useState(0);
    const [dateRowsPerPage, setDateRowsPerPage] = useState(10);
    const [dateRows, setDateRows] = useState({
        data: []
    })

    const [timePage, setTimePage] = useState(0);
    const [timeRowsPerPage, setTimeRowsPerPage] = useState(10);
    const [timeRows, setTimeRows] = useState({
        data: []
    })

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());

	let history = useHistory();
	const classes = useStyles();

    const dateColumns = [
        { id: 'date', label: 'Date', minWidth: 50 },
        { id: 'destinationId', label: 'Assigned Route', minWidth: 110, align: 'center' },
    ];

    const timeColumns = [
        { id: 'departureTime', label: 'Departure Time', minWidth: 110, align: 'center' },
        { id: 'arrivalTime', label: 'Arrival Time', minWidth: 110, align: 'center' },        
        { id: 'dateId', label: 'Assigned Date', minWidth: 110, align: 'center' },
    ];

	const handleBreadCrumbClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'home'){
            history.push('/admin/home');
        }
    }

    const handleDateChangePage = (event, newPage) => {
        setDatePage(newPage);
    }

    const handleDateChangeRowsPerPage = event => {
        setDateRowsPerPage(+event.target.value);
        setDatePage(0);
    }

    const handleTimeChangePage = (event, newPage) => {
        setTimePage(newPage);
    }

    const handleTimeChangeRowsPerPage = event => {
        setTimeRowsPerPage(+event.target.value);
        setTimePage(0);
    }

    const handleDateChange= (e) => {
        setSelectedDate(e.target.value);
    }

    const handleAddDate = (e) => {
        console.log(e.target.id)
    }

    const handleTimeChange= (e) => {
        setSelectedTime(e.target.value);
    }

    const handleAddTime = (e) => {
        console.log(e.target.id)
    }

    console.log(props)

    return (
    	<>	    	
    		<Breadcrumbs aria-label="breadcrumb" className="mb-3">
                <Link id="home" color="inherit" href="/" onClick={handleBreadCrumbClick} className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Home
                </Link>   
                <Typography color="textPrimary" className={classes.link}>            
                    Schedules
                </Typography>
            </Breadcrumbs>
            <div className="container-fluid p-0">
            	<div className="row">
            		<div className="col-lg-6 mb-3 mb-lg-0">
                        <Typography className="mb-3" variant="h6">
                            Date Schedules
                        </Typography>
                        <div>
                            <TextField
                                id="date"
                                label="New Date Schedule"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={handleDateChange}
                            />
                            <IconButton id="add_date" onClick={handleAddDate}>
                                <AddBoxIcon/>
                            </IconButton>
                        </div>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {dateColumns.map(column => (
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
                                        {dateRows.data.slice(datePage * dateRowsPerPage, datePage * dateRowsPerPage + dateRowsPerPage).map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {dateColumns.map(column => {
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
                                count={dateRows.data.length}
                                rowsPerPage={dateRowsPerPage}
                                page={datePage}
                                onChangePage={handleDateChangePage}
                                onChangeRowsPerPage={handleDateChangeRowsPerPage}
                            />
                        </Paper>
            		</div>
                    <div className="col-lg-6">
                        <Typography className="mb-3" variant="h6" component="h1">
                            Time Schedules
                        </Typography>                        
                        <div>
                            <TextField
                                id="time"
                                label="New Time Schedule"
                                type="time"
                                defaultValue="07:30"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  step: 300, // 5 min
                                }}
                                onChange={handleTimeChange}
                            />
                            <IconButton id="add_time" onClick={handleAddTime}>
                                <AddBoxIcon/>
                            </IconButton>
                        </div>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {timeColumns.map(column => (
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
                                        {timeRows.data.slice(timePage * timeRowsPerPage, timePage * timeRowsPerPage + timeRowsPerPage).map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {timeColumns.map(column => {
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
                                count={timeRows.data.length}
                                rowsPerPage={timeRowsPerPage}
                                page={timePage}
                                onChangePage={handleTimeChangePage}
                                onChangeRowsPerPage={handleTimeChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>             
            </div>
    	</>        
    )
}

export default compose(
    graphql(getSchedulesQuery),
    graphql(createDateScheduleMutation, {name: 'createDateSchedule'}),
    graphql(updateDateScheduleMutation, {name: 'updateDateSchedule'}),
    graphql(deleteDateScheduleMutation, {name: 'deleteDateSchedule'}),
    graphql(createTimeScheduleMutation, {name: 'createTimeSchedule'}),
    graphql(updateTimeScheduleMutation, {name: 'updateTimeSchedule'}),
    graphql(deleteTimeScheduleMutation, {name: 'deleteTimeSchedule'})
)(SchedulesPage);
