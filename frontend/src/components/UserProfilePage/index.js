import { useDispatch, useSelector } from "react-redux";
import './UserProfilePage.css';
import { HiOutlineUser } from 'react-icons/hi'
import { useEffect } from "react";
import { deleteEvent, fetchUserEvents } from "../../store/events";
import stockPhoto from '../../assets/imagePlaceholder.png'
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateTicket, fetchTickets, deleteTicket } from "../../store/tickets";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MdMoreVert } from 'react-icons/md';

function UserProfilePage () {
  const { eventId } = useParams();
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const userEvents = useSelector(state => state.events ? Object.values(state.events) : []);
  const tickets = useSelector(state => state.tickets ? Object.values(state.tickets) : []);
  const history = useHistory();

  const [showDropdown, setShowDropdown] = useState(null);

  useEffect(()=> {
    dispatch(fetchUserEvents())
    dispatch(fetchTickets())
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    return formatter.format(date);
  }

  function formatDateDescriptive(dateString) {
    const date = new Date(dateString);
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const handleClick = (e, eventId) => {
    e.preventDefault();
    dispatch(deleteEvent(eventId));
  }

  const handleDelete = (e, eventId, ticketId) => {
    e.preventDefault();
    dispatch(deleteTicket(eventId, ticketId));
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
      <div className="user-profile">
        <div className="user-header">
          <div className="user-content">
            <div className="circle">
              <HiOutlineUser className="user-icon" />
            </div>
            <div className="username">
              {currentUser?.firstName} {currentUser?.lastName}
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
                    {formatDate(ticket?.event?.startTime)}
                  </div>
                  <div className="user-ticket-event-info">
                    <div className="user-ticket-event-image">
                      <img src={ticket.event?.photoUrl} />
                    </div>
                    <div className="user-ticket-event-title">
                      <h1>{ticket.event?.title}</h1>
                      {/* <p className="user-ticket-mobile-event-date">{formatDate(ticket.event.startTime)}</p> */}
                      <p className="user-ticket-event-date-details">{ticket.event ? formatDateDescriptive(ticket.event.startTime) : ""}</p>
                      <p className="user-ticket-quantity">ticket quantity: {ticket.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className="user-ticket-right">
                  <MdMoreVert onClick={() => toggleDropdown(ticket.event?.id)}/>
                    {showDropdown === ticket.event?.id && (
                      <div className="user-ticket-right-ellipsis-dropdown">
                        <button onClick={(e) => handleDelete(e, ticket.event?.id, ticket.id)}>Request a refund</button>
                      </div>
                    )}
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
