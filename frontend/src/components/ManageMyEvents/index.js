import EventFormPage from "../EventFormPage";
import TicketFormPage from "../TicketFormPage";
import { useDispatch, useSelector } from "react-redux";
import stockPhoto from '../../assets/imagePlaceholder.png'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { deleteEvent, fetchUserEvents, updateEvent } from "../../store/events";
import { updateTicket, fetchTickets } from "../../store/tickets";
import { useEffect } from "react";
import { MdMoreVert } from 'react-icons/md';
import { useState } from "react";
import './ManageMyEvents.css';
// import Modal from 'react-modal';
import { Modal } from "../../context/Modal"

function ManageMyEvents() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userEvents = useSelector(state => state.events ? Object.values(state.events) : []);
  const tickets = useSelector(state => state.tickets ? Object.values(state.tickets) : []);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  useEffect(()=> {
    dispatch(fetchUserEvents())
    dispatch(fetchTickets())
  }, [dispatch]);

  const toggleTicketModal = () => {
    setShowTicketModal(!showTicketModal);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    return formatter.format(date);
  }

  const handleDelete = (e, eventId) => {
    e.preventDefault();
    dispatch(deleteEvent(eventId));
  }

  const toggleDropdown = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
  }

  return (
    <>
      <div className="manage-my-events-container">
        <div className="manage-my-events-header">
          <h1>Events</h1>
        </div>

        <div className="manage-my-events-main">
          <div className="manage-my-events-event">
            <h3 className="manage-my-events-title">Event</h3>
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
                        <p className="user-event-description">{event.description}</p>
                        <p className="user-event-ticket-quantity">ticket quantity: {event.ticketQuantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="event-right">
                      <MdMoreVert onClick={() => toggleDropdown(event.id)}/>
                        {showDropdown === event.id && (
                          <div className="event-right-ellipsis-dropdown">
                            <NavLink to="#" onClick={toggleTicketModal}>Add Tickets</NavLink>
                            {/* <NavLink to={`/tickets/${event.id}/new`}>Add Tickets</NavLink> */}
                            <NavLink to={`/tickets/${event.id}/new`}>Edit Tickets</NavLink>
                            <button onClick={(e) => handleDelete(e, event.id)}>Delete Event</button>
                            <NavLink to={`/events/${event.id}/update`}>Edit Event</NavLink>
                            <NavLink to={`/events/${event.id}`}>View Event</NavLink>
                          </div>
                      )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Modal onClose={() => setShowTicketModal(false)}>
        <TicketFormPage
          openTicketModal={() => setShowTicketModal(true)}
          closeTicketModal={() => setShowTicketModal(false)}
        />
      </Modal>
    </>
  )
}

export default ManageMyEvents;
