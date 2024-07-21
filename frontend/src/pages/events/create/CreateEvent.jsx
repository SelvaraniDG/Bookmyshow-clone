import EventForm from '../../../components/common/EventForm';
import React from 'react';
import '../../../assets/images/background.jpg'

const CreateEvent = () => {
    const userId = localStorage.getItem('userId');
    return (
        <>
            <section className='bg-purple-50 py-5 md:py-10'>
                <h3 className='wrapper h3-bold text-center'>Create Event</h3>
            </section>
            <div className='wrapper my-8 px-4  md:px-8 max-dimensions'>
                <EventForm userId={userId} type="Create" />
            </div>
        </>
    );
};

export default CreateEvent;