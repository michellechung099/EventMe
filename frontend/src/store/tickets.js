import csrfFetch from "./csrf";
import { fetchUserEvents } from "./events";

//action constants
const SET_TICKETS = 'tickets/setTickets';
const SET_EVENT_TICKETS = 'tickets/setEventTickets';
const SET_TICKET = 'tickets/setTicket'
const ADD_TICKET = 'tickets/addTicket';
const REMOVE_TICKET = 'tickets/removeTicket';

//action creators
export const setTickets = tickets => ({
  type: SET_TICKETS,
  tickets
})

export const setTicket = ticket => ({
  type: SET_TICKET,
  ticket
})

export const addTicket = ticket => ({
  type: ADD_TICKET,
  ticket
})

export const removeTicket = ticketId => ({
  type: REMOVE_TICKET,
  ticketId
})

//thunk action creators
export const fetchTickets = () => async(dispatch) => {
  const response = await csrfFetch(`/api/tickets`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setTickets(data.tickets));
    return response;
  }
}

export const fetchTicket = ticketId => async(dispatch) => {
  const response = await csrfFetch(`/api/tickets/${ticketId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(addTicket(data.ticket));
    return response;
  }
}

export const createTicket = (eventId, ticket) => async(dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/tickets`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
    },
    body: JSON.stringify({ticket})
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addTicket(data.ticket));

    return response;
  }
};

export const updateTicket = (eventId, ticketId, quantity) => async(dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/tickets/${ticketId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
    },
    body: JSON.stringify({ticketId, quantity})
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setTicket(data.ticket));
    return response;
  }
}

export const deleteTicket = (eventId, ticketId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/tickets/${ticketId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeTicket(ticketId));
    return response;
  }

}

function ticketReducer(state={}, action) {
  switch (action.type) {
    case SET_TICKETS:
      return action.tickets;
    case ADD_TICKET:
      const ticket = action.ticket;
      return {...state, [ticket.id]: ticket };
    case SET_TICKET:
      const updatedTicket = {...state[action.ticket.id], ...action.ticket};
      return {...state, [action.ticket.id]: updatedTicket };
    case SET_EVENT_TICKETS:
      return {...state, [action.eventId]: action.tickets};
    case REMOVE_TICKET:
      const ticketId = action.ticketId;
      const newState = {...state};
      delete newState[ticketId];
      return newState;
    default:
      return state;
  }
}

export default ticketReducer;
