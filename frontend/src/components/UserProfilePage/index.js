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

  useEffect(() => {

  })

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    return formatter.format(date);
  }

  const handleClick = (e, eventId) => {
    e.preventDefault();
    dispatch(deleteEvent(eventId));
  }

  console.log(`tickets: ${JSON.stringify(tickets)}`);

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
        <div className="tickets">
          <h3 className="ticket-orders">Orders</h3>
          <ul className="ticket-list">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="ticket-container">
                <div className="user-ticket-left">
                  <div className="user-ticket-event-date">
                    {formatDate(ticket.event.startTime)}
                  </div>
                  <div className="user-ticket-event-info">
                    <div className="user-ticket-event-image">
                      <img src={ticket.event.photoUrl} />
                    </div>
                    <div className="user-ticket-event-title">
                      <h1>{ticket.event.title}</h1>
                      <p className="user-ticket-event-description">{ticket.event.description}</p>
                      <p className="user-ticket-quantity">ticket quantity: {ticket.quantity}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default UserProfilePage;
