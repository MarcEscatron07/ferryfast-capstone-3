import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getFindSchedulesQuery } from '../../../client-queries/queries';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const moment = require('moment');

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    },
}));

function FindSchedulePage(props) {
    const classes = useStyles();
    const inputLabel = useRef(null);    
    
    const [labelWidth, setLabelWidth] = useState(0);
    const [selectedData, setSelectedData] = useState({
        originId: '',
        destinationId: '',
        dateId: '',
        accommodationId: ''
    })

    const [destinations, setDestinations] = useState({
        data: []
    });
    const [dates, setDates] = useState({
        data: []
    })

    let dataObject = props.data;

    let originOptions, destinationOptions, dateOptions, accommodationOptions;

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
    },[selectedData.originId])

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

    const handleOriginSelection = (e) => {
        setSelectedData({...selectedData, originId: e.target.value})
    }

    const handleDestinationSelection = (e) => {
        setSelectedData({...selectedData, destinationId: e.target.value})
    }

    const handleDateScheduleSelection = (e) => {
        setSelectedData({...selectedData, dateId: e.target.value})
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
    }

    // console.log(props)

    return (
        <Container maxWidth="sm">
            <div className="container content-container rounded shadow p-3">
                <div className="row">
                    <div className="col-6">
                        <form id="form_proceed" onSubmit={handleProceedToTripDetails}>                        
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
                                >
                                    Proceed
                                </Button>
                            </FormControl>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default graphql(getFindSchedulesQuery)(FindSchedulePage);
