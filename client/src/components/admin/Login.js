import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { Toast } from './Toast';

const AdminLogin = () => {
    let history = useHistory();

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

    const adminLoginHandler = () => {
        axios.get('/administrators')
        .then((res) => {
            let matchCounter = 0;
            let username = document.querySelector('#login_username').value.trim();
            let password = document.querySelector('#login_password').value.trim();

            for(let x = 0; x < res.data.length; x++){
                if(username === res.data[x].username && password === res.data[x].password){           
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
        })
        .catch((err) => ToastComponent('error', err));
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
        <Container className="p-4 rounded shadow" maxWidth="sm" style={{marginTop: "15vh", border: "3px solid #d7d7d7"}}>
            <Typography align="center" noWrap variant="h3">
                REMSOFT
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
                    <Link to="/"><u>Go to Client Page</u></Link>                    
                </div>
            </FormControl>
        </Container>
    );
}

export default AdminLogin;