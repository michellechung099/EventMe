import csrfFetch from "./csrf";

// action constants
const SET_EVENTS = 'events/setEvents';
const ADD_EVENT = 'events/addEvent';

// action creators
export const setEvents = events => ({
  type: SET_EVENTS,
  events
})

export const addEvent = event => ({
  type: ADD_EVENT,
  event
})

// thunk action creators
export const fetchEvents = () => async(dispatch) => {
  const response = await csrfFetch(`/api/events`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setEvents(data.events));
    return response;
  }
}

export const fetchEvent = eventId => async(dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(addEvent(data.event));
    return response;
  }
}

export const createEvent = eventFormData => async(dispatch) => {
  const response = await csrfFetch(`/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({event: eventFormData})
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addEvent(data.event));

    return response;
  }
}

// reducer

function eventReducer(state={}, action) {
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
    case ADD_EVENT:
      const event = action.event;
      return {...state, [event.id]: event };
    default:
      return state;
  }
}

export default eventReducer;
