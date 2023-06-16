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
import { Modal, ModalProvider } from "../../context/Modal"

function ManageMyEvents() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userEvents = useSelector(state => state.events ? Object.values(state.events) : []);
  const tickets = useSelector(state => state.tickets ? Object.values(state.tickets) : []);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [eventTicketId, setEventTicketId] = useState(null);

  useEffect(()=> {
    dispatch(fetchUserEvents())
    dispatch(fetchTickets())
  }, [dispatch]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    return formatter.format(date);
  }

  function formatDateDescriptive(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
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

  const closeTicketModal = () => {
    setShowTicketModal(false);
  };

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
                        <p className="user-event-description">{formatDateDescriptive(event.startTime)}</p>
                        <p className="user-event-ticket-quantity">ticket quantity: {event.ticketQuantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="event-right">
                      <MdMoreVert onClick={() => toggleDropdown(event.id)}/>
                        {showDropdown === event.id && (
                          <div className="event-right-ellipsis-dropdown">
                            <div className="add-ticket-link" onClick={() => { setShowTicketModal(true); setEventId(event.id);
                            }}>Add Tickets</div>
                            {/* <div className="add-ticket-link" onClick={() => { setShowTicketModal(true); setEventId(event.id); setEventTicketId(event.eventTicketId);
                            }}>Edit Tickets</div> */}
                            <NavLink to={`/events/${event.id}/eventTickets`}>View Tickets</NavLink>
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
      {showTicketModal && (
        <Modal onClose={()=> {
          closeTicketModal();
          setEventId(null);}}
        >
          <TicketFormPage
            eventId={eventId}
            eventTicketId={eventTicketId}
            openTicketModal={() => setShowTicketModal(true)}
            closeTicketModal={closeTicketModal}
          />
        </Modal>
      )}
    </>
  )
}

export default ManageMyEvents;
