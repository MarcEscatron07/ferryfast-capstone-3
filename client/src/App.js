import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import './App.css';

import Admin from './components_main/Admin';
import AdminAuth from './components/admin/Drawer';
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
        main: '#1f78b9',
        dark: '#000'
     },
     secondary: {
       main: '#dadada',
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
            <MuiThemeProvider theme={theme}>   
              <Route path="/" exact component={Client}/>
              <Route path="/admin" exact component={Admin}/>
              <Route path="/admin/home" component={AdminAuth}/>
              <Route path="/admin/register" component={AdminRegister}/>
            </MuiThemeProvider>
          </Switch>
        </Router>
      </ApolloProvider>      
    </>
  );
}

export default App;
