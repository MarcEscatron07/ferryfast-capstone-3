import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Admin from './components_main/Admin';
import AdminHome from './components/admin/Drawer';
import AdminRegister from './components/admin/Register';

import Client from './components_main/Client';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Client}/>        
          <Route path="/admin" exact component={Admin}/>
          <Route path="/admin/home" component={AdminHome}/>
          <Route path="/admin/register" component={AdminRegister}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
