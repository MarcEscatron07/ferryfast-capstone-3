import React, { useEffect, useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
}));

function FindSchedulePage() {
    const classes = useStyles();
    const inputLabel = useRef(null);    
    
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleOriginSelection = (e) => {
        console.log(e.target.value)
    }

    const handleDestinationSelection = (e) => {
        console.log(e.target.value)
    }

    const handleDepartureDateSelection = (e) => {
        console.log(e.target.value)
    }

    const handleAccommodationSelection = (e) => {
        console.log(e.target.value)
    }

    const handleProceedToTripDetails = (e) => {
        e.preventDefault();        
    }

    return (
        <Container maxWidth="sm">
            <div className="container content-container rounded shadow p-3">
                <div className="row">
                    <div className="col-6">
                        <form id="form_proceed" onSubmit={handleProceedToTripDetails}>                        
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="filled-origin-native-simple">
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
                                >
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="filled-destination-native-simple">
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
                                >
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="filled-departuredate-native-simple">
                                    Departure Date
                                </InputLabel>
                                <Select
                                native
                                onChange={handleDepartureDateSelection}
                                labelWidth={labelWidth}
                                inputProps={{
                                    name: 'departureDate',
                                    id: 'filled-departuredate-native-simple',
                                }}
                                >
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="filled-accommodation-native-simple">
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
                                >
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
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

export default FindSchedulePage
