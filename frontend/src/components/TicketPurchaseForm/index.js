import { useDispatch, useSelector } from 'react-redux';
import './TicketPurchaseForm.css'
import { useInput } from '../../hooks';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { fetchEvent } from '../../store/events';
import { createTicket } from '../../store/tickets';
import { useState } from 'react';

function TicketPurchaseForm({eventTicketId, totalQuantity}) {
  const sessionUser = useSelector(state => state.session.user)
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [quantity, onQuantityChange] = useInput(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=> {
    dispatch(fetchEvent(eventId));
  }, [dispatch])

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    if (quantity <= 0) {
      setErrorMessage('Ticket quantity must be greater than 0');
    } else if (quantity > totalQuantity) {
      setErrorMessage(`Ticket quantity cannot exceed ${totalQuantity}`);
    } else {
      const ticketParams = { quantity: quantity, event_ticket_id: eventTicketId };
      dispatch(createTicket(eventId, ticketParams));
      history.push(`/users/${sessionUser.id}`);
    }
  }

  return (
    <div className="ticket-purchase">
      <form onSubmit={handlePurchaseSubmit} className="checkout-form">
        <div className="ticket-purchase-quantity">
          <label>
            <input
              type="number"
              value={quantity}
              onChange={onQuantityChange}
              max={totalQuantity}
              min={0}
            />
          </label>
        </div>

        <div className="checkout">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="checkout-button">Get Tickets</button>
        </div>
      </form>
    </div>
  )
}

export default TicketPurchaseForm;
