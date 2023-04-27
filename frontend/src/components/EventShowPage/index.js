import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent } from "../../store/events";

function EventShowPage() {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const event = useSelector(state=> state.events[eventId]);

  useEffect(()=> {
    dispatch(fetchEvent(eventId));
  }, [eventId, dispatch])

  if (!event) {
    return null;
  }

  const {title, photoUrl, location, startTime, endTime, summary, userId } = event;

  return(
    <div className="event-show-page">
      <div className="main">
        <div className="event-image">

        </div>
        <div className="event-details">
          <div className="event-details-main">

          </div>
          <div className="event-details-aside">

          </div>
        </div>
      </div>
      <div className="footer">

      </div>
    </div>
  )
}

export default EventShowPage;
