import React from 'react'
import Collection from '../components/common/Collection'
const Home = () => {
  return (
    <>
      <section>
            <h1 className="h1-bold">Host, Connect Your Events</h1>
      </section> 
      <div className="flex w-full flex-col gap-5 md:flex-row">
        {/* Replace these placeholders with actual components */}
        <div>Search</div>
        <div>CategoryFilter</div>

        <Collection />
      </div> 
    </>
  )
}

export default Home