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
          {tickets.map((ticket) => (
            <li className="">
              <h1 className="ticket-event-name">{ticket.eventName}</h1>
              <p className="ticket-name">{ticket.name}</p>
            </li>
          ))}
        </div>
      </div>
    </>
  )
}

export default UserProfilePage;
