import EventForm from '../../components/shared/EventForm';
import React from 'react';

const UpdateEvent = () => {
    const userId = localStorage.getItem('userId');
    return (
        <>
            <section>
                <h3 className='wrapper h3-bold text-center sm:text-left'>Update Event</h3>
            </section>
            <div className='wrapper my-8'>
                <EventForm userId={userId} type="Update" />
            </div>
        </>
    );
};

export default UpdateEvent;