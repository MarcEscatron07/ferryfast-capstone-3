import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import FindSchedulePage from './pages/FindSchedulePage';
import TripDetailsPage from './pages/TripDetailsPage';
import PassengerDetailsPage from './pages/PassengerDetailsPage';
import ConfirmBookingPage from './pages/ConfirmBookingPage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
  
function MainContent() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Find Schedule" {...a11yProps(0)} />
          <Tab label="Trip Details" {...a11yProps(1)} />
          <Tab label="Passenger Details" {...a11yProps(2)} />
          <Tab label="Confirm Booking" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FindSchedulePage/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TripDetailsPage/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <PassengerDetailsPage/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <ConfirmBookingPage/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default MainContent
