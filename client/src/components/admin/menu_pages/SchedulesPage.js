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

import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import AddBoxIcon from '@material-ui/icons/AddBox';

import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

const moment = require('moment');
  
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

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

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
    let defaultDateValue = moment(new Date).format('YYYY-MM-DD');
    let defaultDepartureTimeValue = moment(new Date).format('HH:mm');
    let defaultArrivalTimeValue = moment(new Date).add(3, 'h').format('HH:mm');
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

    const [selectedDate, setSelectedDate] = useState({
        date: defaultDateValue,
        originId: '',
        destinationId: ''
    });
    const [selectedEditDate, setSelectedEditDate] = useState({
        updatedDate: '',
        updatedOriginId: '',
        updatedDestinationId: ''
    });

    const [selectedTime, setSelectedTime] = useState({
        departureTime: defaultDepartureTimeValue,
        arrivalTime: defaultArrivalTimeValue,
        dateId: ''
    });

    let [destinationsArray, setDestinationsArray] = useState([]);
    let [editDestinationsArray, setEditDestinationsArray] = useState([]);

    const [editDateData, setEditDateData] = useState({
        dateId: '',
        dateValue: ''
    });
    const [editDateModal, setEditDateModal] = useState(false);    

	let history = useHistory();
	const classes = useStyles();
    let dataObject = props.data;

    let originOptions, destinationOptions, editDestinationOptions, dateOptions;   

    const dateColumns = [
        { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },
        { id: 'date', label: 'Date', minWidth: 50, align: 'left' },
        { id: 'route', label: 'Assigned Route', minWidth: 110, align: 'left' },
    ];

    const timeColumns = [
        { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },
        { id: 'departureTime', label: 'Departure Time', minWidth: 110, align: 'left' },
        { id: 'arrivalTime', label: 'Arrival Time', minWidth: 110, align: 'left' },        
        { id: 'dateId', label: 'Assigned Date', minWidth: 110, align: 'left' },
    ];

    const renderDateScheduleActions = (id) => {
        return(
            <div className="d-flex justify-content-center">
                <IconButton key={'edit: '+id} value={id} onClick={actionEditDate}>
                    <Edit style={{color: "black"}}/>
                </IconButton>
                <IconButton key={'delete: '+id} value={id} onClick={actionDeleteDate}>
                    <DeleteOutline style={{color: "black"}}/>
                </IconButton>
            </div>
        )
    }

    const renderTimeScheduleActions = (id) => {
        return(
            <div className="d-flex justify-content-center">
                <IconButton key={'edit: '+id} value={id} onClick={actionEditTime}>
                    <Edit style={{color: "black"}}/>
                </IconButton>
                <IconButton key={'delete: '+id} value={id} onClick={actionDeleteTime}>
                    <DeleteOutline style={{color: "black"}}/>
                </IconButton>
            </div>
        )
    }

    useEffect(() => {
        if(dataObject.loading === false && dataObject.error === undefined){            
            let dateSchedulesArray = dataObject.getDateSchedules;
            let timeSchedulesArray = dataObject.getTimeSchedules;

            setDateRows({...dateRows, data: []});
            dateSchedulesArray.forEach(dsArr => {                
                setDateRows(prevState => {
                    if(dsArr.origin !== null){
                        let convertedDate = moment(dsArr.date).format('MMM D, YYYY (ddd)');
                        const data = [...prevState.data];
                        data.push({
                            id: dsArr.id,
                            actions: renderDateScheduleActions(dsArr.id),
                            date: convertedDate,
                            route: `${dsArr.origin.name} > ${dsArr.destination.name}`
                        });
                        return { ...prevState, data };
                    } else {
                        return [];
                    }
                })
            })

            setTimeRows({...timeRows, data: []});
            timeSchedulesArray.forEach(tsArr => {
                setTimeRows(prevState => {
                    if(tsArr.dateSchedule !== null){
                        let convertedDate = moment(tsArr.dateSchedule.date).format('MMM D, YYYY (ddd)');
                        const data = [...prevState.data];
                        data.push({
                            id: tsArr.id,
                            actions: renderTimeScheduleActions(tsArr.id),
                            departureTime: convertTimeToMeridiem(tsArr.departureTime),
                            arrivalTime: convertTimeToMeridiem(tsArr.arrivalTime),
                            dateId: convertedDate
                        })
                        return { ...prevState, data };
                    } else {
                        return [];
                    }
                })
            })
        }

        if(dataObject.error !== undefined){
            Swal.fire({
                icon: "error",
                timer: 2200,
                title: "Failed to load data!"
            })
        }
    },[dataObject])

    useEffect(() => {
        if(dataObject.loading === false && dataObject.error === undefined){            
            let originsArray = dataObject.getOrigins.filter(orArr => {
                if(orArr.id === selectedDate.originId){          
                    return orArr.destinations;
                }
            })
            
            setDestinationsArray(originsArray.map(odArr => {
                return odArr.destinations;
            }));          
        }
    },[selectedDate.originId])

    useEffect(() => {
        if(dataObject.loading === false && dataObject.error === undefined){            
            let originsArray = dataObject.getOrigins.filter(orArr => {
                if(orArr.id === selectedEditDate.updatedOriginId){          
                    return orArr.destinations;
                }
            })
            
            setEditDestinationsArray(originsArray.map(odArr => {
                return odArr.destinations;
            }));          
        }
    },[selectedEditDate.updatedOriginId])

    useEffect(() => {},[editDateData])

    const convertTimeToMeridiem = (time) => {
        let hourAsInt = parseInt(time.slice(0,2));
        let minute = time.slice(3,5);
        if(hourAsInt > 12 && hourAsInt < 24){
            return `${hourAsInt%12}:${minute} PM`;
        } else if(hourAsInt === 0) {
            return `${12}:${minute} AM`;
        } else if(hourAsInt === 12) {
            return `${hourAsInt}:${minute} PM`;
        } else {
            return `${hourAsInt}:${minute} AM`;
        }
    }

	const handleBreadCrumbClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'home'){
            history.push('/admin/home');
        }
    }

    // DateSchedule and TimeSchedule table functions
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
    // 
    
    // DateSchedule CRUD functionalities
    const handleDateChange= (e) => {
        setSelectedDate({...selectedDate, date: e.target.value});
    }

    const handleOriginSelection = (e) => {        
        setSelectedDate({...selectedDate, originId: e.target.value})
    }

    const handleDestinationSelection = (e) => {
        setSelectedDate({...selectedDate, destinationId: e.target.value})
    }

    const handleEditDateChange= (e) => {
        setSelectedEditDate({...selectedEditDate, updatedDate: e.target.value});
    }

    const handleEditOriginSelection = (e) => {        
        setSelectedEditDate({...selectedEditDate, updatedOriginId: e.target.value})
    }

    const handleEditDestinationSelection = (e) => {
        setSelectedEditDate({...selectedEditDate, updatedDestinationId: e.target.value})
    }

    const handleAddDate = (e) => {
        e.preventDefault();
        let addDateErrorCounter = 0;
        if(selectedDate.date === '' || selectedDate.originId === '' 
        || selectedDate.destinationId === ''){
            addDateErrorCounter++;            
        }

        if(addDateErrorCounter === 0){
            let newDateSchedule = {
                date: selectedDate.date,
                originId: selectedDate.originId,
                destinationId: selectedDate.destinationId
            }
            props.createDateSchedule({
                variables: newDateSchedule,
                refetchQueries: [{query: getSchedulesQuery}]
            })
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    timer: 2200,
                    title: "Successfully added date schedule!"
                })

                setSelectedDate({
                    date: defaultDateValue,
                    originId: '',
                    destinationId: ''
                })

                document.querySelector('#form_addDate').reset();
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    timer: 2200,
                    title: "Unable to add date schedule!"
                })
            })
        } else {
            ToastComponent('warning', 'Please apply all required inputs');
        }
    }

    const actionEditDate = (e) => {
        if(e.target.value !== undefined){
            if(dataObject.loading === false && dataObject.error === undefined){
                let dateSchedulesArray = dataObject.getDateSchedules;
                dateSchedulesArray.forEach(dsArr => {
                    if(dsArr.id === e.target.value){               
                        let convertedDate = moment(dsArr.date).format('YYYY-MM-DD');
                        setEditDateData({dateId: e.target.value, dateValue: convertedDate});
                    }
                })
            }            
            setEditDateModal(true);
        }
    }

    const actionCancelEditDate = () => {
        setEditDateModal(false);
    }

    const handleUpdateDateData = (e) => {
        e.preventDefault();
        let updatedDateData = {
            id: editDateData.dateId,
            date: selectedEditDate.updatedDate,
            originId: selectedEditDate.updatedOriginId,
            destinationId: selectedEditDate.updatedDestinationId
        }        
        props.updateDateSchedule({
            variables: updatedDateData,
            refetchQueries: [{query: getSchedulesQuery}]
        })
        .then((res) => {
            Swal.fire({
                icon: "success",
                timer: 2200,
                title: "Successfully updated date schedule!"
            })

            setSelectedEditDate({
                updatedDate: '',
                updatedOriginId: '',
                updatedDestinationId: ''
            })
        })
        .catch((err) => {
            Swal.fire({
                icon: "error",
                timer: 2200,
                title: "Unable to update date schedule!"
            })
        })
        setEditDateModal(false);
    };

    const actionDeleteDate = (e) => {              
        if(e.target.value !== undefined){
            let dateDataId = e.target.value;
            Swal.fire({
                text: 'Are you sure you want to delete this date schedule?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'rgb(221, 51, 51)',
                cancelButtonColor: 'rgb(84, 84, 84)',
                confirmButtonText: 'Delete'
            }).then((result) => {
                if (result.value) {                    
                    let deleteDateData = {
                        id: dateDataId
                    }
                    props.deleteDateSchedule({
                        variables: deleteDateData,
                        refetchQueries: [{query: getSchedulesQuery}]
                    })
                    .then(() => {
                        Swal.fire({
                            icon: "info",
                            timer: 2200,
                            title: "Date schedule deleted!"
                        })
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            timer: 2200,
                            title: "Unable to delete date schedule!"
                        })
                    })
                }
            })            
        }
    }
    // 

    // TimeSchedule CRUD functionalities
    const handleDepartureTimeChange= (e) => {
        setSelectedTime({...selectedTime, departureTime: e.target.value});
        console.log(e.target.value)
    }

    const handleArrivalTimeChange= (e) => {
        setSelectedTime({...selectedTime, arrivalTime: e.target.value});
        console.log(e.target.value)
    }

    const handleDateScheduleSelection = (e) => {
        setSelectedTime({...selectedTime, dateId: e.target.value})
        console.log(e.target.value)
    }

    const handleAddTime = (e) => {
        e.preventDefault();
        let addTimeErrorCounter = 0;
        if(selectedTime.departureTime === '' || selectedTime.arrivalTime === '' 
        || selectedTime.dateId === ''){
            addTimeErrorCounter++;
        }

        if(addTimeErrorCounter === 0){
            let newTimeSchedule = {
                departureTime: selectedTime.departureTime,
                arrivalTime: selectedTime.arrivalTime,
                dateId: selectedTime.dateId
            }
            props.createTimeSchedule({
                variables: newTimeSchedule,
                refetchQueries: [{query: getSchedulesQuery}]
            })
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    timer: 2200,
                    title: "Successfully added time schedule!"
                })

                setSelectedTime({
                    departureTime: defaultDepartureTimeValue,
                    arrivalTime: defaultArrivalTimeValue,
                    dateId: ''
                })

                document.querySelector('#form_addTime').reset();
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    timer: 2200,
                    title: "Unable to add time schedule!"
                })
            })
        } else {
            ToastComponent('warning', 'Please apply all required inputs');
        }
    }

    const actionEditTime = (e) => {
        if(e.target.value !== undefined){
            console.log(e.target.value)
        }
    }

    const actionDeleteTime = (e) => {
        if(e.target.value !== undefined){
            let timeDataId = e.target.value;
            Swal.fire({
                text: 'Are you sure you want to delete this time schedule?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'rgb(221, 51, 51)',
                cancelButtonColor: 'rgb(84, 84, 84)',
                confirmButtonText: 'Delete'
            }).then((result) => {
                if (result.value) {                    
                    let deleteTimeData = {
                        id: timeDataId
                    }
                    props.deleteTimeSchedule({
                        variables: deleteTimeData,
                        refetchQueries: [{query: getSchedulesQuery}]
                    })
                    .then(() => {
                        Swal.fire({
                            icon: "info",
                            timer: 2200,
                            title: "Time schedule deleted!"
                        })
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            timer: 2200,
                            title: "Unable to delete time schedule!"
                        })
                    })
                }
            })            
        }
    }
    // 

    if(dataObject.loading === false && dataObject.error === undefined){            
        originOptions = dataObject.getOrigins.map(origin => {
            return(
                <option key={origin.id} value={origin.id}>{origin.name}</option>
            )
        })

        if(destinationsArray !== undefined){            
            destinationOptions = destinationsArray.map(deArr => {
                return deArr.map(destination => {                    
                    return(
                        <option key={destination.id} value={destination.id}>{destination.name}</option>
                    )
                })
            });  
        }

        if(editDestinationsArray !== undefined){            
            editDestinationOptions = editDestinationsArray.map(deArr => {
                return deArr.map(destination => {                    
                    return(
                        <option key={destination.id} value={destination.id}>{destination.name}</option>
                    )
                })
            });  
        }

        dateOptions = dataObject.getDateSchedules.map(date => {
            let convertedDate = moment(date.date).format('MMM D, YYYY (ddd)');
            return(
                <option key={date.id} value={date.id}>{convertedDate}</option>
            )
        })
    }    
    
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
                        <form id="form_addDate" onSubmit={handleAddDate}>                        
                            <div className="d-flex justify-content-between mb-4">
                                <div className="d-flex">
                                    <TextField
                                        id="date"
                                        label="New Date"
                                        type="date"
                                        defaultValue={defaultDateValue}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{ min: defaultDateValue }}
                                        onChange={handleDateChange}
                                    />
                                    <Select native className="ml-2" 
                                    onChange={handleOriginSelection}
                                    >
                                        <option value="" style={{color: "gray"}}>Select origin..</option>
                                        {originOptions}
                                    </Select>
                                    <Select native className="ml-2" 
                                    onChange={handleDestinationSelection}
                                    >
                                        <option value="" style={{color: "gray"}}>Select destination..</option>
                                        {destinationOptions}
                                    </Select>
                                </div>
                                <IconButton type="submit">
                                    <AddBoxIcon/>
                                </IconButton>
                            </div>
                        </form>
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
                        <form id="form_addTime" onSubmit={handleAddTime}>                        
                            <div className="d-flex justify-content-between mb-4">                        
                                <div className="d-flex">
                                    <TextField
                                        id="arrival_time"
                                        label="New Departure Time"
                                        type="time"
                                        defaultValue={defaultDepartureTimeValue}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        step: 300, // 5 min
                                        }}
                                        onChange={handleDepartureTimeChange}
                                    />
                                    <TextField
                                        id="departure_time"
                                        label="New Arrival Time"
                                        type="time"
                                        defaultValue={defaultArrivalTimeValue}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        step: 300, // 5 min
                                        }}
                                        onChange={handleArrivalTimeChange}
                                    />
                                    <Select native className="ml-2" 
                                    onChange={handleDateScheduleSelection}
                                    >
                                        <option value="" style={{color: "gray"}}>Select date..</option>
                                        {dateOptions}
                                    </Select>
                                </div>
                                <IconButton type="submit">
                                    <AddBoxIcon/>
                                </IconButton>
                            </div>
                        </form>
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
            <Dialog onClose={actionCancelEditDate} aria-labelledby="customized-dialog-title" open={editDateModal}>
                <form id="form_updateDate" onSubmit={handleUpdateDateData}>
                    <DialogTitle id="customized-dialog-title" onClose={actionCancelEditDate}>
                    Edit Date
                    </DialogTitle>
                    <DialogContent dividers>
                    <div className="d-flex">
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            defaultValue={editDateData.dateValue}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ min: defaultDateValue }}
                            onChange={handleEditDateChange}
                            required
                        />
                        <Select native className="ml-2" onChange={handleEditOriginSelection} required>
                            <option value="" style={{color: "gray"}}>Select origin..</option>
                            {originOptions}
                        </Select>
                        <Select native className="ml-2" onChange={handleEditDestinationSelection} required>
                            <option value="" style={{color: "gray"}}>Select destination..</option>
                            {editDestinationOptions}
                        </Select>
                    </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus type="submit" className="rounded-0" color="secondary" style={{backgroundColor: "rgb(84, 84, 84)"}}>
                            Save changes
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
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
