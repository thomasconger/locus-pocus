import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import ModalRoot from './components/ModalRoot';
import Splash from './components/Splash';



function App() {



  return (
    <>
      <ModalRoot />
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Splash />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
