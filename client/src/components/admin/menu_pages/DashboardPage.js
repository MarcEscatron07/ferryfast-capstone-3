import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 22,
    },
}));

function DashboardPage() {
    const classes = useStyles();

    const handleBreadCrumbClick = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/" onClick={handleBreadCrumbClick} className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Home
                </Link>
                <Link
                    color="inherit"
                    href="/getting-started/installation/"
                    onClick={handleBreadCrumbClick}
                    className={classes.link}
                >      
                    {/* Core */}
                </Link>
                {/* <Typography color="textPrimary" className={classes.link}>            
                    Breadcrumb
                </Typography> */}
            </Breadcrumbs>
            <Container>
                
            </Container>
        </>
    )
}

export default DashboardPage;
