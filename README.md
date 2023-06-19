
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
 * User Authentication - Login/Signup
  EventMe features fully functional user authentication system, with demo user login and error handling for incomplete entries. The user is redirected to login page if they attempt to create an event without being logged in. The login and signup pages are connected so the user can switch between login or sign up pages easily.

  <img width="1255" alt="Screenshot 2023-06-16 160353" src="https://github.com/michellechung099/EventMe/assets/98190992/2ca83f70-4567-4105-b632-b8e263c7dded">

 * Search for events based on event name
  On home page, there is a search bar where you can search for events by event name. Pressing `Enter` without any search input will show all the available events again.

  <img width="1250" alt="Screenshot 2023-06-16 164638" src="https://github.com/michellechung099/EventMe/assets/98190992/2c8177be-872c-4fad-8af7-cf48a0876188">

 * Create events
  On navigation bar, there is a "Create an event" that allows signed in users to create a new event to host. It takes you to a form page where user can input all event details. User can view and update these events in the "Manage my events" tab. One notable implementation method is creating a time options with the function getTimeOptions on the frontend `EventFormPage` component and is set as `startExactTime` and `endExactTime`. This time values were then combined with Calendar selected date ranges upon submission, set as `startDate` and `endDate`.

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

 * Update, delete, or view user created events
 On navigation bar, when user hovers over their username, there is a dropdown menu with a tab called "Manage my events." This page lists all the events that the user has created. on the right side of each event, there is an ellipsis dropdown. Upon click, user has an option to edit event, delete event, and view event.

  ![Alt text](image-3.png)

 * Create tickets for the created events

 * Purchase tickets for the events
 On individual event page, there is a section where you can purchase tickets for that specific event. You can specify the quantity of the tickets you want to purchase for the event.

 * User profile page - view all purchased tickets
 On navigation bar, at "Manage my events" tab, there is also a "Tickets" tab.

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
