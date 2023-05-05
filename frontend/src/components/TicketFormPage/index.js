import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInput } from "../../hooks";
import { createTicket, updateTicket } from '../../store/tickets';
import './TicketForm.css'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchTicket } from '../../store/tickets';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function TicketFormPage() {
  // const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { eventId, ticketId } = useParams();
  const currentUser = useSelector(state => state.session.user);
  const history = useHistory();

  const [name, onNameChange] = useInput('');
  const [price, onPriceChange] = useInput('');
  const [quantity, onQuantityChange] = useInput('');
  const [salesStartTime, onSalesStartTimeChange] = useInput('');
  const [salesEndTime, onSalesEndTimeChange] = useInput('');

  const ticket = useSelector(state => ticketId? state.tickets[ticketId] : null);

  useEffect(()=> {
    if (ticketId) {
      dispatch(fetchTicket(ticketId));
    }
  }, [dispatch, ticketId]);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      name,
      price,
      quantity,
      salesStartTime,
      salesEndTime,
    };
    if (ticketId) {
      newTicket.id = ticketId;
      dispatch(updateTicket(eventId, ticket));
    } else {
      dispatch(createTicket(eventId, newTicket));
    }
    history.push(`/users/${currentUser.id}`);
  };

  return (
    <form onSubmit={handleTicketSubmit}>
      <div className="ticket-header">
        <h1>Add tickets</h1>
      </div>
      <div className="ticket-name">
        <label>
          <input
            type="text"
            value={name}
            onChange={onNameChange}
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
            onChange={onQuantityChange}
            required
            placeholder="Available quantity"
          />
        </label>
      </div>
      <div className="ticket-price">
        <label>
          <input
            type="text"
            value={price}
            onChange={onPriceChange}
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
            onChange={onSalesStartTimeChange}
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
            onChange={onSalesEndTimeChange}
            required
            placeholder="Sales end"
          />
        </label>
      </div>

      <div className="tickets-save">
        <button className="tickets-button">Save</button>
      </div>
    </form>
  )
}

export default TicketFormPage;
