import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';


function App() {

  const data = useSelector((state) => state)
  const example = "test"

  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
      </Route>
      </Switch>
    </>
  );
}

export default App;
