import csrfFetch from "./csrf";

// action constants
const SET_EVENTS = 'events/setEvents';
const ADD_EVENT = 'events/addEvent';
// const SET_USER_EVENTS = 'events/setUserEvents'
const REMOVE_EVENT = 'events/removeEvent';
const REMOVE_USER_EVENT = 'events/removeUserEvent';

// action creators
export const setEvents = events => ({
  type: SET_EVENTS,
  events
})

export const addEvent = event => ({
  type: ADD_EVENT,
  event
})

// export const setUserEvents = userEvents => {
//   const eventsArray = Object.values(userEvents);
//   return {
//     type: SET_USER_EVENTS,
//     userEvents: eventsArray,
//   };
// };

export const removeEvent = eventId => ({
  type: REMOVE_EVENT,
  eventId
})

export const removeUserEvent = eventId => ({
  type: REMOVE_USER_EVENT,
  eventId
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

export const fetchUserEvents = () => async(dispatch) => {
  const response = await csrfFetch(`/api/user/events/user_events`);

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

export const createEvent = event => async(dispatch) => {
  const response = await csrfFetch(`/api/events`, {
    method: 'POST',
    headers: {
        // 'Content-Type': 'multipart/form-data',
        "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
      },
    // body: (event)
    body: event
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addEvent(data.event));

    return response;
  }
};

export const updateEvent = (event, eventId) => async (dispatch) => {
  const formData = new FormData();

  // Object.keys(event).forEach((key) => {
  //   formData.append(key, event[key]);
  // });

  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'PATCH',
    headers: {
      "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
    },
    body: event
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addEvent(data.event));
  }
}

export const deleteEvent = eventId => async(dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
    }
  })
  dispatch(removeEvent(eventId));
  dispatch(removeUserEvent(eventId));
}

// reducer

function eventReducer(state={}, action) {
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
    case ADD_EVENT:
      const event = action.event;
      return {...state, [event.id]: event };
    // case SET_USER_EVENTS:
    //   const userEventsObject = {};
    //   action.userEvents.forEach(event => {
    //     userEventsObject[event.id] = event;
    //   });
    //   return { ...state, ...userEventsObject };
    case REMOVE_EVENT:
      const eventId = action.eventId;
      const newState = {...state};
      delete newState[eventId];
      return newState;
    default:
      return state;
  }
}

export default eventReducer;
