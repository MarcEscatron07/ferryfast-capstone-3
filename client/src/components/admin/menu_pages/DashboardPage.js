import React, { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import { graphql } from 'react-apollo';

import { getDashboardQuery } from '../../../client-queries/queries';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import LibraryBooks from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
    paper: {
        minWidth: '15rem',
        minHeight: '8rem',
        padding: '.8rem'
    }
  }));

function DashboardPage(props) {
    const classes = useStyles();
    const dataObject = props.data;

    let bookingCount, passengerCount, administratorCount, mailCount;

    if(dataObject.loading === false && dataObject.error === undefined){
        bookingCount = dataObject.getBookings.length;
        passengerCount = dataObject.getPassengers.length;
        administratorCount = dataObject.getAdministrators.length
        mailCount = 0;
    }

    if(dataObject.error !== undefined){                   
        Swal.fire({
            icon: "error",
            timer: 2200,
            title: "Failed to load data!"
        })
    }

    console.log(props)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3 d-flex">
                    <Paper className={classes.paper} elevation={3} square style={{background: 'linear-gradient(60deg, #af32ba, #9e1a9d)'}}>
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center">
                                <LibraryBooks style={{color: '#fff'}}/>
                                <Typography className="d-inline-block ml-2" variant="h5" component="h1" style={{color: "#fff"}}>
                                    Bookings
                                </Typography>                                
                            </div>
                            <Typography className="d-inline-block ml-2 mt-2" variant="h4" component="h1" style={{color: "#fff"}}>
                                {bookingCount}
                            </Typography>
                        </div>
                    </Paper>                        
                </div>
                <div className="col-md-3 d-flex">
                    <Paper className={classes.paper} elevation={3} square style={{background: 'linear-gradient(60deg, #66bb6a, #43a047)'}}>
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center">
                                <PersonIcon style={{color: '#fff'}}/>
                                <Typography className="d-inline-block ml-2" variant="h5" component="h1" style={{color: "#fff"}}>
                                    Passengers
                                </Typography>                                
                            </div>
                            <Typography className="d-inline-block ml-2 mt-2" variant="h4" component="h1" style={{color: "#fff"}}>
                                {passengerCount}
                            </Typography>
                        </div>
                    </Paper>                        
                </div>
                <div className="col-md-3 d-flex">
                    <Paper className={classes.paper} elevation={3} square style={{background: 'linear-gradient(60deg, #ef5350, #e53935)'}}>
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center">
                                <SupervisorAccountIcon style={{color: '#fff'}}/>
                                <Typography className="d-inline-block ml-2" variant="h5" component="h1" style={{color: "#fff"}}>
                                    Administrators
                                </Typography>                                
                            </div>
                            <Typography className="d-inline-block ml-2 mt-2" variant="h4" component="h1" style={{color: "#fff"}}>
                                {administratorCount}
                            </Typography>
                        </div>
                    </Paper>                        
                </div>
                <div className="col-md-3 d-flex">
                    <Paper className={classes.paper} elevation={3} square style={{background: 'linear-gradient(60deg, #26c6da, #00acc1)'}}>
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center">
                                <MailIcon style={{color: '#fff'}}/>
                                <Typography className="d-inline-block ml-2" variant="h5" component="h1" style={{color: "#fff"}}>
                                    Mails
                                </Typography>                                
                            </div>
                            <Typography className="d-inline-block ml-2 mt-2" variant="h4" component="h1" style={{color: "#fff"}}>
                                {mailCount}
                            </Typography>
                        </div>
                    </Paper>                        
                </div>
            </div>
        </div>
    )
}

export default graphql(getDashboardQuery)(DashboardPage);
