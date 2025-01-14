import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import PassengersAndContacts from './pages/PassengersAndContactsPage';
import RoutesPage from './pages/RoutesPage';
import SchedulesPage from './pages/SchedulesPage';
import SeatsPage from './pages/SeatsPage';
import AccommodationsPage from './pages/AccommodationsPage';

import AdministratorsPage from './pages/AdministratorsPage';
import MailsPage from './pages/MailsPage';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import ExploreIcon from '@material-ui/icons/Explore';
import ScheduleIcon from '@material-ui/icons/Schedule';
import NoteIcon from '@material-ui/icons/Note';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 270;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    color: "#fff",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AdminDrawer = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const openOptions = Boolean(anchorEl);

  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const generalMenus = [
    'Dashboard', 
    'Bookings', 
    'Passengers & Contacts', 
    'Routes', 
    'Schedules', 
    'Seats', 
    'Accommodations'
  ];

  const generalIcons = [
    <DashboardIcon/>,
    <LibraryBooks/>,
    <PersonIcon/>,
    <ExploreIcon/>,
    <ScheduleIcon/>,
    <AirlineSeatReclineNormalIcon/>,
    <NoteIcon/>
  ];

  const systemMenus = ['Administrators', 'Mails']; 
  const systemIcons = [<SupervisorAccountIcon/>,<MailIcon/>]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = event => { //used when Auth will be applied
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    history.push('/admin');
  }

  const drawerMenuHandler = (item) => {
    console.log('drawerMenuHandler > item:', item)    
    if(item === generalMenus[0]){
      history.push('/admin/home');
    } else if(item === generalMenus[1]){
      history.push('/admin/home/bookings');
    } else if(item === generalMenus[2]){
      history.push('/admin/home/passengers&contacts');
    } else if(item === generalMenus[3]){
      history.push('/admin/home/routes');
    } else if(item === generalMenus[4]){
      history.push('/admin/home/schedules');
    } else if(item === generalMenus[5]){
      history.push('/admin/home/seats');
    } else if(item === generalMenus[6]){
      history.push('/admin/home/accommodations');
    } else if(item === systemMenus[0]){
      history.push('/admin/home/administrators');
    } else if(item === systemMenus[1]){
      history.push('/admin/home/mails');
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          {!open && (
            <Typography variant="h6" noWrap>
              FerryFast Admin
            </Typography>
          )}
          {auth && (
            <div className="ml-auto">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openOptions}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} style={{backgroundColor: "#1f78b9"}}>
          <Typography variant="h6" align="center" style={{width: "100%"}} noWrap>
              FerryFast Admin
            </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon color="secondary"/> : <ChevronLeftIcon color="secondary"/>}
          </IconButton>
        </div>
        <Divider />
        <List>
          {generalMenus.map((text, index) => (
            <ListItem button key={text} id={text} onClick={() => {drawerMenuHandler(text)}}>
              <ListItemIcon>{generalIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {systemMenus.map((text, index) => (
            <ListItem button key={text} id={text} onClick={() => {drawerMenuHandler(text)}}>
              <ListItemIcon>{systemIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* insert components to be mounted here */}
        <Route path="/admin/home" exact component={DashboardPage}/>
        <Route path="/admin/home/bookings" component={BookingsPage}/>
        <Route path="/admin/home/passengers&contacts" component={PassengersAndContacts}/>
        <Route path="/admin/home/routes" component={RoutesPage}/>
        <Route path="/admin/home/schedules" component={SchedulesPage}/>
        <Route path="/admin/home/seats" component={SeatsPage}/>
        <Route path="/admin/home/accommodations" component={AccommodationsPage}/>
        <Route path="/admin/home/administrators" component={AdministratorsPage}/>
        <Route path="/admin/home/mails" component={MailsPage}/>
      </main>
    </div>
  );
}

export default AdminDrawer;