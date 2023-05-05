import { useDispatch, useSelector } from "react-redux";
import './UserProfilePage.css';
import { HiOutlineUser } from 'react-icons/hi'
import { useEffect } from "react";
import { deleteEvent, fetchUserEvents } from "../../store/events";
import stockPhoto from '../../assets/imagePlaceholder.png'
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateTicket, fetchTickets } from "../../store/tickets";
import { useState } from "react";

function UserProfilePage () {
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const userEvents = useSelector(state => state.events ? Object.values(state.events) : []);
  const { eventId } = useParams();
  const tickets = useSelector(state => state.tickets ? Object.values(state.tickets) : []);

  useEffect(()=> {
    dispatch(fetchUserEvents())
    dispatch(fetchTickets())
  }, [dispatch]);

  // useEffect(()=> {
  //   dispatch(updateTicket(eventId, ticketId, quantity))
  // }, [dispatch])

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    return formatter.format(date);
  }

  const handleClick = (e, eventId) => {
    e.preventDefault();
    dispatch(deleteEvent(eventId));
  }

  return (
    <>
      <div className="user-profile">
        <div className="user-header">
          <div className="user-content">
            <div className="circle">
              <HiOutlineUser className="user-icon" />
            </div>
            <div className="username">
              {currentUser.firstName} {currentUser.lastName}
            </div>
          </div>
        </div>
        <div className="user-events">
          <h3 className="title">Events</h3>
          <ul className="list">
            {userEvents.map((event) => (
              <li key={event.id} className="event-container">
                <div className="event-left">
                  <div className="user-event-date">
                    {formatDate(event.startTime)}
                  </div>
                  <div className="user-event-info">
                    <div className="user-event-image">
                      <img src={event.photoUrl ? event.photoUrl : stockPhoto} />
                    </div>
                    <div className="user-event-title">
                      <h1>{event.title}</h1>
                      <p>{event.description}</p>
                    </div>
                  </div>
                </div>
                <div className="event-right">
                    <p>{event.ticketQuantity}</p>
                    <NavLink to={`/tickets/${event.id}/new`}>Add Tickets</NavLink>
                    <NavLink to={`/tickets/${event.id}/new`}>Edit Tickets
                    </NavLink>
                    <button onClick={(e) => handleClick(e, event.id)}>Delete Event</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="tickets">
          <h3 className="ticket-orders">Orders</h3>
          {
            tickets.map(ticket => {
              return (
                <div className="ticket-index">

                        <h1 className="ticket-event-name">{ticket.eventName}</h1>
                        <p className="ticket-name">{ticket.name}</p>

                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default UserProfilePage;
