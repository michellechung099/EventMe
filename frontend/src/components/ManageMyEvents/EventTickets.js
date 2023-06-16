import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventTickets } from '../../store/eventTickets';
import EventTicket from './EventTicket';
import './EventTickets.css';

function EventTickets() {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  console.log(`eventId: ${eventId}`);

  const eventTickets = useSelector(state => state.eventTickets ? Object.values(state.eventTickets) : []);

  useEffect(() => {
    dispatch(fetchEventTickets(eventId));
  }, [dispatch])

  console.log(`eventTickets: ${eventTickets}`);

  return (
    <div>
      <div className="event-tickets-header">
        <h2 className="event-tickets-header-title">
          Tickets
        </h2>
      </div>
      <div className="admission-header">
        <p className="admission">Admission</p>
      </div>
      <ul className="list-of-event-tickets">
        {eventTickets.map((eventTicket) => (
          <EventTicket eventTicket={eventTicket} />
        ))}
      </ul>
    </div>
  )
}

export default EventTickets;
