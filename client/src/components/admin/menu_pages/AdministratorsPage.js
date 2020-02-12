import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import { Toast } from './ToastAuth';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getAdministratorsQuery } from '../../../client-queries/queries';
import {
    createAdministratorMutation, 
    deleteAdministratorMutation, 
    updateAdministratorMutation 
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

function AdministratorsPage(props) {
	const [administratorPage, setAdministratorPage] = useState(0);
    const [administratorRowsPerPage, setAdministratorRowsPerPage] = useState(10);
    const [administratorRows, setAdministratorRows] = useState({
        data: []
    })

    let history = useHistory();
    const classes = useStyles();
    let dataObject = props.data;

    const administratorColumns = [        
        { id: 'id', label: 'ID', minWidth: 110, align: 'center', isHidden: true },
        { id: 'username', label: 'Username', minWidth: 110, align: 'center', isHidden: false },
        { id: 'firstname', label: 'Firstname', minWidth: 110, align: 'center', isHidden: false },
        { id: 'surname', label: 'Surname', minWidth: 110, align: 'center', isHidden: false },
        { id: 'email', label: 'Email', minWidth: 110, align: 'center', isHidden: false },
        { id: 'password', label: 'Password', minWidth: 110, align: 'center', isHidden: false },
        { id: 'roleId', label: 'Role', minWidth: 110, align: 'center', isHidden: false },
        { id: 'statId', label: 'Status', minWidth: 110, align: 'center', isHidden: false },
    ];

    useEffect(() => {
    	if(dataObject.loading === false && dataObject.error === undefined){
            if(dataObject.getAdministrators !== null){
                let administratorsArray = dataObject.getAdministrators;
    
                setAdministratorRows({...administratorRows, data: []});
                administratorsArray.forEach(adArr => {
                    setAdministratorRows(prevState => {                    
                        const data = [...prevState.data];
                        data.push({
                            id: adArr.id,
                            username: adArr.username,
                            firstname: adArr.firstname,
                            surname: adArr.surname,
                            email: adArr.email,
                            password: adArr.password,
                            roleId: adArr.role.name,
                            statId: adArr.stat.name                        
                        });
                        return { ...prevState, data };
                    });
                });
            }
    	}

    	if(dataObject.error !== undefined){
            Swal.fire({
                icon: "error",
                timer: 2200,
                title: "Failed to load data!"
            })
        }
    },[dataObject])

    const handleBreadCrumbClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'home'){
            history.push('/admin/home');
        }
    }

    const handleAdministratorChangePage = (event, newPage) => {
        setAdministratorPage(newPage);
    }

    const handleAdministratorChangeRowsPerPage = event => {
        setAdministratorRowsPerPage(+event.target.value);
        setAdministratorPage(0);
    }    

    return (
        <>
        	<Breadcrumbs aria-label="breadcrumb" className="mb-3">
                <Link id="home" color="inherit" href="/" onClick={handleBreadCrumbClick} className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Home
                </Link>   
                <Typography color="textPrimary" className={classes.link}>            
                    Administrators
                </Typography>
            </Breadcrumbs>
            <div className="container-fluid p-0">
            	<div className="row">
                    <div className="col">
                    	<Typography className="mb-2" variant="h6" component="h1">
                            Administrators
                        </Typography>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {administratorColumns.map(column => (
                                            <TableCell
                                            className="font-weight-bold"
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            hidden={column.isHidden}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {administratorRows.data.slice(administratorPage * administratorRowsPerPage, administratorPage * administratorRowsPerPage + administratorRowsPerPage).map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {administratorColumns.map((column,index) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align} hidden={index === 0 ? true:false}>
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
                                count={administratorRows.data.length}
                                rowsPerPage={administratorRowsPerPage}
                                page={administratorPage}
                                onChangePage={handleAdministratorChangePage}
                                onChangeRowsPerPage={handleAdministratorChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default compose(
	graphql(getAdministratorsQuery),
    graphql(createAdministratorMutation, {name: 'createAdministrator'}),
    graphql(updateAdministratorMutation, {name: 'updateAdministrator'}),
    graphql(deleteAdministratorMutation, {name: 'deleteAdministrator'})
)(AdministratorsPage);
