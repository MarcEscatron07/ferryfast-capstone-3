import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  navbarBrand: {
    height: "4rem", 
    width: "8rem"
  },
}));

function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <div className="d-flex align-items-center py-2">
                  <img className={classes.navbarBrand} src="images/ferryfast-logo-cropped.png"/>
                  <Typography variant="h4" className="d-inline-block">
                  <em>FerryFast</em>
                  </Typography>
                </div>
                <div className="ml-auto">
                    <IconButton type="submit">
                        <HelpIcon color="secondary"/>
                    </IconButton>                    
                </div>
            </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar
