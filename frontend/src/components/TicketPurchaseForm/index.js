import { useDispatch, useSelector } from 'react-redux';
import './TicketPurchaseForm.css'
import { useInput } from '../../hooks';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { fetchEvent } from '../../store/events';
import { updateTicket } from '../../store/tickets';

function TicketPurchaseForm() {
  const sessionUser = useSelector(state => state.session.user)
  const { eventId, ticketId } = useParams();
  const event = useSelector(state => state.events[eventId])
  const ticket = useSelector(state => state.tickets[ticketId])
  const dispatch = useDispatch();
  const history = useHistory();

  const [quantity, onQuantityChange] = useInput(0);

  useEffect(()=> {
    dispatch(fetchEvent(eventId));
  }, [dispatch])

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTicket(eventId, null, quantity))
    history.push(`/users/${sessionUser.id}`);
  }

  return (
    <div className="ticket-purchase">
      <div className="ticket-event-details">
        {/* <div className="ticket-event-title">
          {event.title}
        </div>
        <div className="ticket-event-date">
          {event.startTime} {event.endTime}
        </div> */}

      </div>
      <form onSubmit={handlePurchaseSubmit} className="checkout-form">
        <div className="ticket-main-details">
          <div className="ticket-name">
            {/* <h3>Ticket Name</h3> */}
          </div>
          <div className="ticket-purchase-quantity">

            <label>
              <input
                type="number"
                value={quantity}
                onChange={onQuantityChange}
              />
            </label>
          </div>
        </div>

        <div className="checkout">
          <button className="checkout-button">Get Tickets</button>
        </div>
      </form>
    </div>
  )
}

export default TicketPurchaseForm;
