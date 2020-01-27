import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Cancel from '@material-ui/icons/Cancel';
import Send from '@material-ui/icons/Send';

import Swal from 'sweetalert2';
import { Toast } from './Toast';

const AdminRegister = () => {
    let history = useHistory();

    const [username,setUserName] = useState('');
    const [firstname,setFirstName] = useState('');
    const [surname,setSurName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cfmpassword,setCfmPassword] = useState('');

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

    const getInputValueHandler = (e) => {        
        if(e.target.id === 'register_username') {
            setUserName(e.target.value.trim());
        } else if(e.target.id === 'register_firstname') {
            setFirstName(e.target.value.trim());
        } else if(e.target.id === 'register_surname') {
            setSurName(e.target.value.trim());
        } else if(e.target.id === 'register_email') {
            setEmail(e.target.value.trim());
        } else if(e.target.id === 'register_password') {
            setPassword(e.target.value.trim());
        } else if(e.target.id === 'register_cfmpassword') {
            setCfmPassword(e.target.value.trim());
        }
    }

    const cancelRegistrationHandler = () => {
        history.push("/admin");
    }

    const submitRegistrationHandler = (e) => {        
        e.preventDefault();        
        if(password === cfmpassword){
            axios.get('/administrators')
            .then((res) => {
                let matchCounter = 0;
                let usernameCounter = 0;
                let emailCounter = 0;

                res.data.forEach((rs) => {
                    if(rs.username === username){
                        ++usernameCounter;
                        ++matchCounter;
                    }          
    
                    if(rs.email === email){
                        ++emailCounter;
                        ++matchCounter;        
                    }              
                });

                if(usernameCounter > 0 && emailCounter > 0){
                    ToastComponent('warning', 'Account already exists!');                        
                } else if(usernameCounter > 0){
                    ToastComponent('warning', 'Username already taken!');             
                } else if(emailCounter > 0) {
                    ToastComponent('warning', 'Email already taken!');         
                } else {                   
                    if(matchCounter === 0){       
                        const config = {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }                        
                        const newAccount = JSON.stringify({
                            username: username,
                            firstname: firstname,
                            surname: surname,
                            email: email,
                            password: password,
                            roleId: "5e2c5033ae5995e7a53d5066" //ObjectId of 'Staff' in Roles collection
                        });          
                        axios.post('/administrators',newAccount,config)                        
                        .then((res) => {                           
                            if(res.status === 200){                
                                Swal.fire({                                    
                                    icon: 'success',
                                    title: 'You have successfully registered!',
                                    text: 'Redirecting to login page...',
                                    showConfirmButton: false,
                                    timer: 2200,
                                    onAfterClose: () => {                                        
                                        history.push('/admin');
                                    }
                                });   
                            }
                        })
                        .catch((err) => ToastComponent('error', err));
                    }
                }
            })
            .catch((err) => ToastComponent('error', err));                
        } else {
            ToastComponent('warning', 'Passwords do not match!');      
        }
    }

    return(
        <Container className="p-4 rounded shadow" maxWidth="sm" style={{marginTop: "15vh", border: "3px solid #d7d7d7"}}>
            <Typography align="left" noWrap variant="h5">
                CREATE AN ACCOUNT
            </Typography>
            <hr/>
            <form onSubmit={submitRegistrationHandler}>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <div className="form-group">
                                <TextField
                                    id="register_username"
                                    className="register-input"
                                    label="Username"
                                    type="text"
                                    placeholder="Enter username"
                                    variant="standard"
                                    onChange={getInputValueHandler}
                                    required
                                    />
                            </div>
                            <div className="form-group">
                                <TextField
                                    id="register_firstname"
                                    className="register-input"
                                    label="Firstname"
                                    type="text"
                                    placeholder="Enter firstname"
                                    variant="standard"
                                    onChange={getInputValueHandler}
                                    required
                                    />
                            </div>
                            <div className="form-group">
                                <TextField
                                    id="register_surname"
                                    className="register-input"
                                    label="Surname"
                                    type="text"
                                    placeholder="Enter surname"
                                    variant="standard"
                                    onChange={getInputValueHandler}     
                                    required
                                    />
                            </div>
                        </div>
                        <div className="col text-center">
                            <div className="form-group">
                                <TextField
                                    id="register_email"
                                    className="register-input"
                                    label="Email"
                                    type="email"
                                    placeholder="Enter email"
                                    variant="standard"
                                    onChange={getInputValueHandler}      
                                    required
                                    />
                            </div>
                            <div className="form-group">
                                <TextField
                                    id="register_password"
                                    className="register-input"
                                    label="Password"
                                    type="password"
                                    placeholder="Enter password"
                                    variant="standard"
                                    onChange={getInputValueHandler}      
                                    required
                                    />
                            </div>
                            <div className="form-group">
                                <TextField
                                    id="register_cfmpassword"
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm password"
                                    variant="standard"
                                    onChange={getInputValueHandler}                    
                                    required
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center py-3">
                            <Button
                                className="mx-2"
                                variant="contained"
                                color="default"                        
                                endIcon={<Cancel />}
                                onClick={cancelRegistrationHandler}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="mx-2"
                                type="submit"
                                variant="contained"
                                color="primary"                        
                                endIcon={<Send />}                                
                            >
                                Submit
                            </Button>                                                        
                        </div>
                    </div>
                </div>
            </form>
        </Container>
    );
}

export default AdminRegister;