import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInput } from "../../hooks";
import { createEventTicket, updateEventTicket, fetchEventTickets } from '../../store/tickets';
import './TicketForm.css'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchTicket } from '../../store/tickets';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import Modal from 'react-modal';

function TicketFormPage({eventId, eventTicketId, closeTicketModal}) {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const currentUser = useSelector(state => state.session.user);
  const history = useHistory();

  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [salesStartTime, setSalesStartTime] = useState(new Date());
  const [salesEndTime, setSalesEndTime] = useState(new Date());
  const [dateField, setDateField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ticket = useSelector(state => eventTicketId ? Object.values(state.tickets).find(item => item.eventTicketId === eventTicketId) : null);
  console.log("event ticket", ticket);
  console.log("event ticket id", eventTicketId);
  console.log("event id:", eventId);

  useEffect(() => {
    dispatch(fetchEventTickets(eventId));
  }, [dispatch, eventId]);

  const eventTickets = useSelector(state => state.tickets[eventId]);
  const eventTicketObjects = eventTickets? Object.values(eventTickets) : null;
  const lastEventTicket = eventTicketObjects[eventTicketObjects.length - 1]

  useEffect(() => {
    if (lastEventTicket) {
      const salesStart = new Date(lastEventTicket?.salesStartTime);
      const updateSalesStart = new Date(salesStart);
      const salesEnd = new Date(lastEventTicket?.salesEndTime);
      const updateSalesEnd = new Date(salesEnd);

      setName(lastEventTicket?.name);
      setUnitPrice(lastEventTicket?.unitPrice);
      setQuantity(lastEventTicket?.quantity);
      setSalesStartTime(updateSalesStart);
      setSalesEndTime(updateSalesEnd);
    }
  }, [lastEventTicket])

  const handleDateChange = (ranges) => {
    const start = ranges.selection.startDate;
    const end = ranges.selection.endDate;

    if (dateField === 'start') {
      setSalesStartTime(start);
    } else if (dateField === 'end') {
      setSalesEndTime(end);
    }

    setIsModalOpen(false);
  }

  const customStyles = {
    content: {
      zIndex: '300',
      width: '400px',
      height: '400px',
      position: 'absolute',
      top: '28%',
      left: '38.2%',
    },
    overlay: {
      zIndex: '150',
    },
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      name,
      unitPrice,
      quantity,
      salesStartTime,
      salesEndTime,
    };
    if (eventTicketId) {
      dispatch(updateEventTicket(eventId, eventTicketId, newTicket));
    } else {
      dispatch(createEventTicket(eventId, newTicket));
    }
    closeTicketModal();
    history.push(`/users/${currentUser.id}/events`);
  };

  // I need to change ticket-header name to Edit tickets when updating the tickets
  return (
    <form onSubmit={handleTicketSubmit}>
      <div className="create-ticket-form-container">
        <div className="ticket-header">
          <h1>{ticketId ? 'Edit Tickets': 'Add tickets'}</h1>
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
              value={format(salesStartTime, "MM/dd/yyyy")}
              // onChange={(e) => setSalesStartTime(e.target.value)}
              onClick={() => {
                setDateField('start');
                setIsModalOpen(true);
              }}
              required
              placeholder="Sales start"
            />
          </label>
        </div>
        <div className="ticket-sales-end">
          <label>
            <input
              type="text"
              // value={salesEndTime}
              // onChange={(e)=>setSalesEndTime(e.target.value)}
              value={format(salesEndTime, "MM/dd/yyyy")}
              onClick={()=> {
                setDateField('end');
                setIsModalOpen(true);
              }}
              required
              placeholder="Sales end"
            />
          </label>
        </div>
        <Modal
            contentLabel="Date Range Picker Modal"
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={customStyles}
          >
            <DateRange
              ranges={[{
                startDate: salesStartTime,
                endDate: salesEndTime,
                key: 'selection',
              }]}
              onChange={handleDateChange}
              months={1}
              direction="horizontal"
            />
          </Modal>

        <div className="tickets-save">
          <button className="tickets-button">Save</button>
        </div>
      </div>
    </form>
  )
}

export default TicketFormPage;
