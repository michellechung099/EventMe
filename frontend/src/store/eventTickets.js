import csrfFetch from "./csrf";
import { fetchUserEvents } from "./events";

//action constants
const SET_EVENT_TICKETS = 'tickets/setEventTickets';
const SET_EVENT_TICKET = 'tickets/setEventTicket'
const ADD_EVENT_TICKET = 'tickets/addEventTicket';
const REMOVE_EVENT_TICKET = 'tickets/removeEventTicket';

//action creators
export const setEventTickets = eventTickets => ({
  type: SET_EVENT_TICKETS,
  eventTickets
})

export const setEventTicket = eventTicket => ({
  type: SET_EVENT_TICKET,
  eventTicket
})

export const addEventTicket = eventTicket => ({
  type: ADD_EVENT_TICKET,
  eventTicket
})

export const removeEventTicket = eventTicketId => ({
  type: REMOVE_EVENT_TICKET,
  eventTicketId
})

//thunk action creators
export const fetchEventTickets = () => async(dispatch) => {
  const response = await csrfFetch(`/api/event_tickets`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setEventTickets(data.tickets));
    return response;
  }
}

export const fetchEventTicket = ticketId => async(dispatch) => {
  const response = await csrfFetch(`/api/event_tickets/${ticketId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(addEventTicket(data.ticket));
    return response;
  }
}

export const createEventTicket = (eventId, eventTicket) => async(dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/event_tickets`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
    },
    body: JSON.stringify({eventTicket})
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addEventTicket(data.ticket));
    dispatch(fetchUserEvents());

    return response;
  }
}

export const updateEventTicket = (eventId, eventTicketId, eventTicket) => async(dispatch) => {
  console.log(`inside updateEventTicket API call...`);
  const response = await csrfFetch(`/api/events/${eventId}/event_tickets/${eventTicketId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
    },
    body: JSON.stringify({eventTicket})
  });

  if (response.ok) {
    const data = await response.json();
    // dispatch(addTicket(data.ticket));
    dispatch(fetchUserEvents());
    //dispatch(fetchEventTickets(eventId));
    dispatch(fetchEventTickets())

    return response;
  }
}

// export const deleteTicket = (eventId, ticketId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/events/${eventId}/tickets/${ticketId}`, {
//     method: 'DELETE'
//   })

//   if (response.ok) {
//     dispatch(removeTicket(ticketId));
//     return response;
//   }

// }

function eventTicketReducer(state={}, action) {
  switch (action.type) {
    case SET_EVENT_TICKETS:
      return action.eventTickets;
    case ADD_EVENT_TICKET:
      const ticket = action.eventTicket;
      return {...state, [ticket.id]: ticket };
    case SET_EVENT_TICKET:
      const updatedTicket = {...state[action.eventTicket.id], ...action.eventTicket};
      return {...state, [action.eventTicket.id]: updatedTicket };
    // case REMOVE_TICKET:
    //   const ticketId = action.ticketId;
    //   const newState = {...state};
    //   delete newState[ticketId];
    //   return newState;
    default:
      return state;
  }
}

export default eventTicketReducer;
