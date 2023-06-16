import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventTickets } from '../../store/eventTickets';
import { Modal, ModalProvider } from "../../context/Modal"
import { useState } from 'react';
import TicketFormPage from '../TicketFormPage';
import './EventTicket.css';
import { MdMoreVert } from 'react-icons/md';

function EventTicket({eventTicket}) {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);

  const closeTicketModal = () => {
    setShowTicketModal(false);
  };

  const toggleDropdown = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
  }

  return (
    <>
    <div>
        {
          <li key={eventTicket.id} className="event-ticket-list-container">
            <div className="event-ticket-left">
              <div className="event-ticket-name">{eventTicket.name}</div>
            </div>
            <div className="event-ticket-middle">
              <div className="event-ticket-quantity">{eventTicket.quantity}</div>
            </div>
            <div className="event-ticket-right">
              <MdMoreVert onClick={() => toggleDropdown(eventTicket.id)}/>
                {showDropdown === eventTicket.id && (
                  <div className="event-ticket-right-ellipsis-dropdown">
                    <div className="event-ticket-edit-ticket-link" onClick={() => {setShowTicketModal(true)}}>Edit</div>
                  </div>
              )}
            </div>
          </li>
        }
    </div>
    {showTicketModal && (
      <Modal onClose={()=> {
        closeTicketModal()}}
      >
        <TicketFormPage
          eventId={eventTicket.eventId}
          eventTicketId={eventTicket.id}
          openTicketModal={() => setShowTicketModal(true)}
          closeTicketModal={closeTicketModal}
        />
      </Modal>
    )}
    </>
  )
}

export default EventTicket;
