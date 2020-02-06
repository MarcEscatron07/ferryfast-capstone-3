import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { Toast } from './Toast';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAdministratorsQuery } from '../../client-queries/queries';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    loginBrand: {
      height: "7rem", 
      width: "7rem"
    },
  }));

const ToastComponent = (iconProp, titleProp) => {
    Toast.fire({
        icon: iconProp,
        title: titleProp,
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
    });
}

const AdminLogin = (props) => {
    const classes = useStyles();
    let data = props.data;
    let history = useHistory();    

    const adminLoginHandler = () => {
        if(data.loading === false && data.error === undefined){
            let dataArray = data.getAdministrators;

            let matchCounter = 0;
            let username = document.querySelector('#login_username').value.trim();
            let password = document.querySelector('#login_password').value.trim();

            for(let x = 0; x < dataArray.length; x++){
                if(username === dataArray[x].username && password === dataArray[x].password){           
                    matchCounter = 0;
                    history.push('/admin/home');
                    break;
                } else {
                    ++matchCounter;
                }
            }

            if(matchCounter > 0){
                ToastComponent('warning', 'Account not found!');
            }
        }

        if(data.error !== undefined) {
            ToastComponent('error', 'Failed to load data');
        }
    }

    const adminRegisterHandler = () => {
        history.push('/admin/register');
    }

    const onEnterKeyHandler = (e) => {        
        if(e.keyCode === 13){
            adminLoginHandler();
        }
    }

    return(
        <div className="texture-background d-flex align-items-center" style={{height: "100vh"}}>
            <Container className="bg-white p-3 rounded-half shadow" maxWidth="xs" style={{border: "2px solid #d7d7d7"}}>
                <img className={classes.loginBrand} src="images/ferryfast-logo-cropped-square.png"/>
                <Typography align="center" noWrap variant="h5">
                    FerryFast Admin
                </Typography>      
                <hr/>
                <FormControl>
                    <FormGroup className="my-2">
                        <TextField
                            id="login_username"
                            label="Username"
                            type="text"
                            placeholder="Enter username"
                            variant="standard"
                            onKeyDown={onEnterKeyHandler}
                            />
                    </FormGroup>

                    <FormGroup className="my-2">
                        <TextField
                            id="login_password"
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            autoComplete="current-password"
                            variant="standard"
                            onKeyDown={onEnterKeyHandler}
                            />
                    </FormGroup>
                    <div className="py-3">
                        <Button
                            className="mx-2"
                            variant="contained"
                            color="primary"                        
                            endIcon={<VpnKeyIcon />}
                            onClick={adminLoginHandler}
                        >
                            Log In
                        </Button>
                        <Button
                            className="mx-2"
                            variant="contained"
                            color="secondary"                        
                            endIcon={<PersonAddIcon />}
                            onClick={adminRegisterHandler}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="d-block text-center my-3">
                        <Link to="/">
                            <Button
                                className="rounded-0"
                                variant="outlined"
                                color="primary"
                            >
                                Go to Client Page
                            </Button>
                        </Link>
                    </div>
                </FormControl>
            </Container>
        </div>
    );
}

export default compose(
    graphql(getAdministratorsQuery)
)(AdminLogin);