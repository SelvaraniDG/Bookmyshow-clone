import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, fetchRelatedEvents } from '../../redux/eventSlice';
import { formatDateTime } from '../../lib/utils'; // You'll need to implement this utility
// import './EventDetails.css'; // Ensure you have this CSS file

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [relatedEventsPage, setRelatedEventsPage] = useState(1); // For pagination
  const { event, relatedEvents, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (event?.category_id) {
      dispatch(fetchRelatedEvents({ categoryId: event.category_id, eventId: id, page: relatedEventsPage }));
    }
  }, [dispatch, event, relatedEventsPage, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section className="event-details-container">
        <div className="event-details-content">
          <img 
            src={event?.image_url} 
            alt={event?.title} 
            className="event-image"
          />

          <div className="event-details-info">
            <h2 className="event-title">{event?.title}</h2>
            <div className="event-meta">
              <span className={`event-price ${event?.is_free ? 'free' : 'paid'}`}>
                {event?.is_free ? 'FREE' : `$${event?.price}`}
              </span>
              <span className="event-category">{event?.category?.name}</span>
              <span className="event-organizer">by {event?.organizer}</span>
            </div>

            <div className="event-datetime">
              <p>{formatDateTime(event?.startDateTime).dateOnly} - {formatDateTime(event?.startDateTime).timeOnly}</p>
              <p>{formatDateTime(event?.endDateTime).dateOnly} - {formatDateTime(event?.endDateTime).timeOnly}</p>
            </div>

            <div className="event-location">
              <p>{event?.location}</p>
            </div>

            <div className="event-description">
              <p>{event?.description}</p>
              <a href={event?.url} className="event-url">{event?.url}</a>
            </div>
          </div>
        </div>

        {/* Related Events */}
        <section className="related-events-section">
          <h2>Related Events</h2>
          <div className="related-events">
            {relatedEvents?.length ? (
              relatedEvents.map((e) => (
                <div key={e.event_id} className="related-event">
                  <img src={e.image_url} alt={e.title} className="related-event-image" />
                  <div className="related-event-info">
                    <h3>{e.title}</h3>
                    <p>{e.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Related Events Found</p>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default EventDetails;