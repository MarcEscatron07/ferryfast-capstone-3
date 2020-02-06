import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getFindSchedulesQuery } from '../../../client-queries/queries';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Radio from '@material-ui/core/Radio';

import Collapse from '@material-ui/core/Collapse';

const moment = require('moment');

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
    },
    container: {
        maxHeight: 440,
    },
}));

const BlueRadio = withStyles({
    root: {
      color: blue[500],
      '&$checked': {
        color: blue[700],
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);

function FindSchedulePage(props) {
    const classes = useStyles();
    const inputLabel = useRef(null);    
    
    const [labelWidth, setLabelWidth] = useState(0);

    const [selectedData, setSelectedData] = useState({
        originId: '',
        destinationId: '',
        dateId: '',
        timeId: '',
        accommodationId: ''
    })

    const [destinations, setDestinations] = useState({
        data: []
    });
    const [dates, setDates] = useState({
        data: []
    })
    const [accommodations, setAccommodations] = useState({
        data: []
    })

    const [timePage, setTimePage] = useState(0);
    const [timeRowsPerPage, setTimeRowsPerPage] = useState(5);
    const [timeRows, setTimeRows] = useState({
        data: []
    })

    const [openCollapse, setOpenCollapse] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState('');

    let dataObject = props.data;

    let originOptions, destinationOptions, dateOptions, accommodationOptions;

    const timeColumns = [
        { id: 'departureTime', label: 'ETD', minWidth: 50, align: 'left' },
        { id: 'arrivalTime', label: 'ETA', minWidth: 50, align: 'left' },
        { id: 'action', label: '', minWidth: 50, align: 'center' },
    ];

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    },[])

    useEffect(() => {
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
            setDestinations({...destinations, data: []});
            dataObject.getDestinations.forEach(deArr => {                
                if(deArr.originId === selectedData.originId){
                    setDestinations(prevState => {
                        const data = [...prevState.data]
                        data.push({
                            id: deArr.id,
                            name: deArr.name,
                        })
                        return { ...prevState, data };
                    })                               
                }
            })
        }
    },[selectedData.originId, selectedRadio])

    useEffect(() => {
        if(dataObject.loading === false && dataObject.error === undefined){
            setDates({...dates, data: []});
            dataObject.getDateSchedules.forEach(dsArr => {
                if(dsArr.destinationId === selectedData.destinationId){
                    setDates(prevState => {
                        let convertedDate = moment(dsArr.date).format('MMM D, YYYY (ddd)');
                        const data = [...prevState.data]
                        data.push({
                            id: dsArr.id,
                            date: convertedDate
                        })
                        return {...prevState, data };
                    })
                }
            })
        }
    },[selectedData.destinationId])

    useEffect(() => {
        if(dataObject.loading === false && dataObject.error === undefined){
            setTimeRows({...timeRows, data: []});
            dataObject.getTimeSchedules.forEach(tsArr => {
                if(tsArr.dateId === selectedData.dateId){
                    setTimeRows(prevState => {
                        const data = [...prevState.data];
                        data.push({
                            id: tsArr.id,
                            departureTime: convertTimeToMeridiem(tsArr.departureTime),
                            arrivalTime: convertTimeToMeridiem(tsArr.arrivalTime),
                            action: renderTimeScheduleRadioButton(tsArr.id)
                        })
                        return { ...prevState, data };
                    })
                }
            })
    
            if(selectedData.dateId !== "") {
                setOpenCollapse(true)
            } else {
                setOpenCollapse(false)
            }
        }
    },[selectedData.dateId, selectedRadio])

    useEffect(() => {
        if(dataObject.loading === false && dataObject.error === undefined){
            setAccommodations({...accommodations, data: []});
            dataObject.getAccommodations.forEach(acArr => {                
                setAccommodations(prevState => {
                    const data = [...prevState.data]
                    data.push({
                        id: acArr.id,
                        name: acArr.name,
                    })
                    return { ...prevState, data };
                })                               
            })
        }
    },[selectedData.timeId])

    useEffect(() => {},[openCollapse])

    const renderTimeScheduleRadioButton = (id) => {    
        return(
            <BlueRadio
                id={id}
                checked={selectedRadio === id ? true:false}
                onChange={handleTimeScheduleRadioChange}
                value={id}
                inputProps={{ 'aria-label': id }}
            />
        )
    }

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

    const handleTimeChangePage = (event, newPage) => {
        setTimePage(newPage);
    }

    const handleOriginSelection = (e) => {
        setSelectedData({...selectedData, originId: e.target.value})
    }

    const handleDestinationSelection = (e) => {
        setSelectedData({...selectedData, destinationId: e.target.value})
    }

    const handleDateScheduleSelection = (e) => {
        setSelectedData({...selectedData, dateId: e.target.value})        
    }

    const handleTimeScheduleRadioChange =(e) => {
        setSelectedData({...selectedData, timeId: e.target.value})
        setSelectedRadio(e.target.value);
    }

    const handleAccommodationSelection = (e) => {
        setSelectedData({...selectedData, accommodationId: e.target.value})
    }

    const handleProceedToTripDetails = (e) => {
        e.preventDefault();        
    }

    if(dataObject.loading === false && dataObject.error === undefined){
        originOptions = dataObject.getOrigins.map(origin => {
            return(
                <option key={origin.id} value={origin.id}>{origin.name}</option>
            )
        })

        destinationOptions = destinations.data.map(destination => {
            return(
                <option key={destination.id} value={destination.id}>{destination.name}</option>
            )
        })
        
        dateOptions = dates.data.map(date => {
            return(
                <option key={date.id} value={date.id}>{date.date}</option>
            )
        })

        accommodationOptions = accommodations.data.map(accommodation => {
            return(
                <option key={accommodation.id} value={accommodation.id}>{accommodation.name}</option>
            )
        })
    }

    // console.log(props)

    return (
        <div style={{height: "100vh"}}>        
            <Container maxWidth="xs">
                <div className="container content-container rounded shadow p-3">
                    <div className="row">
                        <div className="col text-center">
                            <form id="form_proceed" onSubmit={handleProceedToTripDetails}> 
                                <div className="d-flex flex-column justify-content-center">
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel shrink ref={inputLabel} htmlFor="filled-origin-native-simple">
                                            Origin
                                        </InputLabel>
                                        <Select
                                        native
                                        onChange={handleOriginSelection}
                                        labelWidth={labelWidth}
                                        inputProps={{
                                            name: 'origin',
                                            id: 'filled-origin-native-simple',
                                        }}
                                        required
                                        >
                                        <option value="">Select origin..</option>
                                        {originOptions}
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel shrink ref={inputLabel} htmlFor="filled-destination-native-simple">
                                            Destination
                                        </InputLabel>
                                        <Select
                                        native
                                        onChange={handleDestinationSelection}
                                        labelWidth={labelWidth}
                                        inputProps={{
                                            name: 'destination',
                                            id: 'filled-destination-native-simple',
                                        }}
                                        required
                                        >
                                        <option value="">Select destination..</option>
                                        {destinationOptions}
                                        </Select>
                                    </FormControl>                                                
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel shrink ref={inputLabel} htmlFor="filled-departuredate-native-simple">
                                            Departure Date
                                        </InputLabel>
                                        <Select
                                        native
                                        onChange={handleDateScheduleSelection}
                                        labelWidth={labelWidth}
                                        inputProps={{
                                            name: 'departureDate',
                                            id: 'filled-departuredate-native-simple',
                                        }}
                                        required
                                        >
                                        <option value="">Select date..</option>
                                        {dateOptions}
                                        </Select>
                                    </FormControl>                            
                                    <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                                        <Paper className={classes.root}>                                                            
                                            <TableContainer className={classes.container}>
                                                <Table size="small" aria-label="a dense table">
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
                                                rowsPerPageOptions={[5]}
                                                component="div"
                                                count={timeRows.data.length}
                                                rowsPerPage={timeRowsPerPage}
                                                page={timePage}
                                                onChangePage={handleTimeChangePage}                                            
                                            />
                                        </Paper>
                                    </Collapse>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel shrink ref={inputLabel} htmlFor="filled-accommodation-native-simple">
                                            Accommodation
                                        </InputLabel>
                                        <Select
                                        native
                                        onChange={handleAccommodationSelection}
                                        labelWidth={labelWidth}
                                        inputProps={{
                                            name: 'date',
                                            id: 'filled-accommodation-native-simple',
                                        }}
                                        required
                                        >
                                        <option value="">Select accommodation..</option>
                                        {accommodationOptions}
                                        </Select>
                                        <Button className="mt-3" 
                                            variant="contained"
                                            color="primary" 
                                            type="submit"
                                            disabled={
                                                selectedData.originId !== '' 
                                                && selectedData.destinationId !== ''
                                                && selectedData.dateId !== '' 
                                                && selectedData.timeId !== ''
                                                && selectedData.accommodationId !== '' ?
                                                false:true
                                            }
                                        >
                                            Proceed
                                        </Button>
                                    </FormControl>
                                </div>                       
                            </form>
                        </div>                    
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default graphql(getFindSchedulesQuery)(FindSchedulePage);
