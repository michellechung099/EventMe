
# EventMe

### Background

EventMe is a fullstack clone of <a href="https://eventbrite.com">Eventbrite</a>, which is a platform for event management and ticketing.

Users have CRUD functionalities for:
  * creating events (Create, Read, Update, Delete)
  * creating tickets for the events (Create, Read, Update, Delete)
  * purchasing tickets for the events (Create, Read, Delete)

Link: <a href="https://eventme.onrender.com/">EventMe</a>

---

### Functionality & MVPs
 - User Authentication - Login/Signup
    - EventMe features fully functional user authentication system, with demo user login and error handling for incomplete entries. The user is redirected to login page if they attempt to create an event without being logged in. The login and signup pages are connected so the user can switch between login or sign up pages easily.

  <img width="1255" alt="Screenshot 2023-06-16 160353" src="https://github.com/michellechung099/EventMe/assets/98190992/2ca83f70-4567-4105-b632-b8e263c7dded">

 - Search for events based on event name
    - On home page, there is a search bar where you can search for events by event name. Pressing `Enter` without any search input will show all the available events again.

  <img width="1250" alt="Screenshot 2023-06-16 164638" src="https://github.com/michellechung099/EventMe/assets/98190992/2c8177be-872c-4fad-8af7-cf48a0876188">

 - Create events
    - On navigation bar, there is a "Create an event" that allows signed in users to create a new event to host. It takes you to a form page where user can input all event details. User can view and update these events in the "Manage my events" tab. One notable implementation method is creating a time options with the function getTimeOptions on the frontend `EventFormPage` component and is set as `startExactTime` and `endExactTime`. This time values were then combined with Calendar selected date ranges upon submission, set as `startDate` and `endDate`.

  ```JavaScript
    const getTimeOptions = () => {
      const options = [];

      for (let i=0; i < 24; i ++) {
        for (let j=0; j < 60; j+=30) {
          const hours = i < 10 ? `0${i}`: i;
          const minutes = j === 0 ? `00` : j;

          const time = `${hours}:${minutes}`;
          const period = i < 12 ? 'AM' : 'PM';

          options.push({
            value: time,
            label: `${i === 0 ? 12 : (i > 12 ? i - 12 : i)}:${minutes} ${period}`
          })
        }
      }
      return options;
    }
  ```

  ```JavaScript
    const [errors, onSubmit] = useSubmit({
    createAction: () => {
      const formData = new FormData();

      const startDateTime = `${format(startDate, "yyyy-MM-dd")}T${startExactTime}:00`;
      const endDateTime = `${format(endDate, "yyyy-MM-dd")}T${endExactTime}:00`;

      formData.append('title', title);
      formData.append('eventType', eventType);
      formData.append('category', category);
      formData.append('location', location);
      formData.append('startTime', startDateTime);
      formData.append('endTime', endDateTime);
      formData.append('summary', summary);
      formData.append('description', description);
      formData.append('ticketQuantity', ticketQuantity);

      if (photoFile) {
        formData.append('photo', photoFile);
      }

      if (eventId) {
        formData.append('id', eventId);
        return updateEvent(formData, eventId);
      }

      return createEvent(formData);
    },
    onSuccess: () => {
      history.push(`/users/${sessionUser.id}/events`);
    }
  });
  ```

  <img width="1261" alt="create-an-event" src="https://github.com/michellechung099/EventMe/assets/98190992/9eac8974-47d5-48cf-b484-3c6b6f68c496">

 - Update, delete, or view user created events
   - On navigation bar, when user hovers over their username, there is a dropdown menu with a tab called "Manage my events." This page lists all the events that the user has created. on the right side of each event, there is an ellipsis dropdown. Upon click, user has an option to edit event, delete event, and view event.

  <img width="1265" alt="manage-my-events" src="https://github.com/michellechung099/EventMe/assets/98190992/4aeb720e-53af-4924-a455-f3c31ed0ea4c">

 - Create tickets for the created events
    - On "Mangage my events" page, each event has an ellipsis dropdown that also has options to "Add Tickets" and "View Tickets." Clicking on "Add Tickets" opens a Modal to create new tickets for that event the user has created.
    - Clicking on "View Tickets" shows all the tickets for that event the user has created. For each ticket, there is an ellipsis dropdown that lets the user "Edit" the ticket information.

  <img width="311" alt="add-tickets" src="https://github.com/michellechung099/EventMe/assets/98190992/bc645d60-8b61-47ad-8c94-2e94643bc59a">

  <img width="1270" alt="event-tickets" src="https://github.com/michellechung099/EventMe/assets/98190992/c4300c6a-780b-4eea-9bcb-60e62b9c37c7">

 - Purchase tickets for the events
 On individual event page, there is a section where you can purchase tickets for that specific event. You can specify the quantity of the tickets you want to purchase for the event and click "get tickets" for purchase.

 <img width="1220" alt="get-tickets" src="https://github.com/michellechung099/EventMe/assets/98190992/fd5cac55-9cfa-4ee3-9c3c-0a73c4ef9d69">

 - User profile page
 On navigation bar, at "Manage my events" tab, there is also a "Tickets" tab. Clicking on this "Tickets" tab takes user to a page to view all the purchased tickets.

 <img width="1187" alt="purchased-tickets" src="https://github.com/michellechung099/EventMe/assets/98190992/a3713078-6c66-4129-8691-63369aec4660">


---

### Technologies, Libraries, APIs

 * `React` and `JavaScript` frontend with `CSS` styling and `Redux` for state management
 * `Ruby on Rails` backend with `JBuilder` to generate JSON responses
 * `AWS` for hosting event images and `Active Storage` for using images in the app
 * `bcrypt` for user authorization
 * `Date Range Picker` for event and ticket date selection
 * `React icons` for all the icons used in the app
 * `Render` for hosting
 * `Webpack` to bundle and transpile JavaScript code
 * `npm` to manage project dependencies

---
### Asset Attribution
  * seed images: Splash
  * other images: Eventbrite
