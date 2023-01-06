import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import ModalService from './components/ModalService';
import TestModal from './components/TestModal';
import ModalRoot from './components/ModalRoot';



function App() {

  const addModal = () => {
    ModalService.open(TestModal);
  };

  return (
    <>
      <ModalRoot />
      <Navigation />
      <Switch>
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
