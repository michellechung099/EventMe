import csrfFetch from "./csrf";

//action constants
const SET_TICKETS = 'tickets/setTickets';
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
    console.log(`data: ${data}`);
    dispatch(addTicket(data.ticket));

    return response;
  }
};

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
    console.log(`data: ${data}`);
    dispatch(addTicket(data.ticket));

    return response;
  }
}

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

// export const deleteTicket = ticketId => async (dispatch) => {
//   const response = await csrfFetch(`api/events/${eventId}/tickets/${ticketId}`, {
//     method: 'DELETE'
//   })

//   if (response.ok) {
//     dispatch()
//   }

// }

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
    default:
      return state;
  }
}

export default ticketReducer;
