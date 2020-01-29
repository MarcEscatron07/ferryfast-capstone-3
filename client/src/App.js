import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

function App() {
  return (
    <>
      <ApolloProvider client={clientConnection}>
        <Router>
          <Switch>
            <Route path="/" exact component={Client}/>        
            <Route path="/admin" exact component={Admin}/>
            <Route path="/admin/home" component={AdminHome}/>
            <Route path="/admin/register" component={AdminRegister}/>
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
