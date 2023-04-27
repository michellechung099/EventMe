import React from "react";
import { Route, Switch, useLocation } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import EventIndexPage from "./components/EventIndexPage";
import EventShowPage from "./components/EventShowPage";

function App() {
  const location = useLocation();
  const showNavigation = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavigation && <Navigation />}
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/">
          <EventIndexPage />
        </Route>
        <Route exact path="/events/:eventId">
          <EventShowPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
