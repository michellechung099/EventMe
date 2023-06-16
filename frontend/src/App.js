import React from "react";
import { Route, Switch, useLocation } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import EventIndexPage from "./components/EventIndexPage";
import EventShowPage from "./components/EventShowPage";
import EventFormPage from "./components/EventFormPage";
import TicketFormPage from "./components/TicketFormPage";
import UserProfilePage from "./components/UserProfilePage";
import TicketPurchaseForm from "./components/TicketPurchaseForm";
import ManageMyEvents from "./components/ManageMyEvents";
import EventTickets from "./components/ManageMyEvents/EventTickets";

function App() {
  const location = useLocation();
  const showNavigation = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavigation && <Navigation />}
      <Switch>
        <Route path="/login" component={LoginFormPage}/>
        <Route path="/signup" component={SignupFormPage} />
        <Route exact path="/users/:userId" component={UserProfilePage} />
        <Route exact path="/users/:userId/events" component={ManageMyEvents} />
        <Route exact path="/" component={EventIndexPage} />
        <Route exact path="/events/new" component={EventFormPage} />
        <Route exact path="/events/:eventId/update" component={EventFormPage} />
        <Route exact path="/tickets/:eventId/new" component={TicketFormPage} />
        <Route exact path="/tickets/:eventId/update" component={TicketPurchaseForm} />
        <Route exact path="/events/:eventId" component={EventShowPage} />
        <Route exact path="/events/:eventId/eventTickets" component={EventTickets} />
      </Switch>
    </>
  );
}

export default App;
