import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import './App.css';

import Admin from './components_main/Admin';
import AdminHome from './components/admin/Drawer';
import AdminRegister from './components/admin/Register';

import Client from './components_main/Client';

const uriValue = '/graphql';
const clientConnection = new ApolloClient({
  uri: uriValue
})

const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#fff',
        main: '#531a72',
        dark: '#000'
     },
     secondary: {
       main: '#f3e5f5',
     },
  },
  typography: { 
     useNextVariants: true
  }
});

function App() {
  return (
    <>      
      <ApolloProvider client={clientConnection}>
        <Router>
          <Switch>
            <Route path="/" exact component={Client}/>

            <MuiThemeProvider theme = {theme}>   
              <Route path="/admin" exact component={Admin}/>
              <Route path="/admin/home" component={AdminHome}/>
              <Route path="/admin/register" component={AdminRegister}/>
            </MuiThemeProvider>
          </Switch>
        </Router>
      </ApolloProvider>      
    </>
  );
}

export default App;
