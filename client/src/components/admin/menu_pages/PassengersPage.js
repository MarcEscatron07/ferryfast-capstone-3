import React from 'react';
import { useHistory } from 'react-router-dom';

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

function PassengersPage(props) {
    let history = useHistory();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const columns = [
        { id: 'firstname', label: 'First Name', minWidth: 110 },
        { id: 'middleinitial', label: 'M.I.', minWidth: 50, align: 'center', },
        { id: 'lastname', label: 'Last Name', minWidth: 110, align: 'center', },
        { id: 'age', label: 'Age', minWidth: 50, align: 'center', },
        { id: 'gender', label: 'Gender', minWidth: 100, align: 'center', },
        { id: 'seatId', label: 'Seat No.', minWidth: 80, align: 'center', },
        { id: 'contactId', label: 'Contact Ref.', minWidth: 110, align: 'center', },
        { id: 'bookingId', label: 'Booking No.', minWidth: 110, align: 'center', }
    ];
    
    const displayData = (firstname, middleinitial, lastname, age, gender, 
        seatId, contactId, bookingId
    ) => {        
        return { firstname, middleinitial, lastname, age, gender, 
            seatId, contactId, bookingId 
        };
    }
    
    const rows = [
        displayData('Marc Benedict', 'C.', 'Escatron', 23, 'M', '1A', 'Espe Gesalan', '070707'),
    ];

    const handleBreadCrumbClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'home'){
            history.push('/admin/home');
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className="mb-3">
                <Link id="home" color="inherit" href="/" onClick={handleBreadCrumbClick} className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Home
                </Link>   
                <Typography color="textPrimary" className={classes.link}>            
                    Passengers
                </Typography>
            </Breadcrumbs>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col">
                    <Typography className="mb-2" variant="h6" component="h1">
                        Passengers
                    </Typography>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                    {columns.map(column => (
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
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map(column => {
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
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PassengersPage;
