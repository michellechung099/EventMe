import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInput } from "../../hooks";
import { createTicket, updateTicket } from '../../store/tickets';
import './TicketForm.css'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchTicket } from '../../store/tickets';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createEventTicket } from '../../store/tickets';

function TicketFormPage() {
  // const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { eventId, ticketId } = useParams();
  const currentUser = useSelector(state => state.session.user);
  const history = useHistory();

  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [salesStartTime, setSalesStartTime] = useState('');
  const [salesEndTime, setSalesEndTime] = useState('');

  const ticket = useSelector(state => ticketId? state.tickets[ticketId] : null);
  console.log(ticket);

  useEffect(()=> {
    if (ticketId) {
      dispatch(fetchTicket(ticketId));
    }
  }, [dispatch, ticketId]);

  useEffect(() => {
    if (ticketId) {
      setName(ticket?.name);
      setUnitPrice(ticket?.unitPrice);
      setQuantity(ticket?.quantity);
      setSalesStartTime(ticket?.salesStartTime);
      setSalesEndTime(ticket?.salesEndTime);
    }
  }, [ticket])
  // i need to pre-populate the form with ticket data when the user is updating the form

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      name,
      unitPrice,
      quantity,
      salesStartTime,
      salesEndTime,
    };
    if (ticketId) {
      newTicket.id = ticketId;
      dispatch(updateTicket(eventId, ticket));
    } else {
      dispatch(createEventTicket(eventId, newTicket));
    }
    history.push(`/users/${currentUser.id}/events`);
  };

  // I need to change ticket-header name to Edit tickets when updating the tickets
  return (
    <form onSubmit={handleTicketSubmit}>
      <div className="create-ticket-form-container">
        <div className="ticket-header">
          <h1>Add tickets</h1>
        </div>
        <div className="ticket-name">
          <label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ticket name"
            />
          </label>
        </div>
        <div className="ticket-quantity">
          <label>
            <input
              type="text"
              value={quantity}
              onChange={(e)=> setQuantity(e.target.value)}
              required
              placeholder="Available quantity"
            />
          </label>
        </div>
        <div className="ticket-price">
          <label>
            <input
              type="text"
              value={unitPrice}
              onChange={(e)=> setUnitPrice(e.target.value)}
              required
              placeholder="Price"
            />
          </label>
        </div>
        <div className="ticket-sales">
          <label>
            <input
              type="text"
              value={salesStartTime}
              onChange={(e) => setSalesStartTime(e.target.value)}
              required
              placeholder="Sales start"
            />
          </label>
        </div>
        <div className="ticket-sales-end">
          <label>
            <input
              type="text"
              value={salesEndTime}
              onChange={(e)=>setSalesEndTime(e.target.value)}
              required
              placeholder="Sales end"
            />
          </label>
        </div>

        <div className="tickets-save">
          <button className="tickets-button">Save</button>
        </div>
      </div>
    </form>
  )
}

export default TicketFormPage;
