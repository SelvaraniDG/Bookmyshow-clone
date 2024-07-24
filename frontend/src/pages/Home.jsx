import React from 'react'
import Collection from '../components/common/Collection'
import CustomCarousel from '../components/common/CustomCarousel'
import SearchBar from '../components/common/SearchBar';
const Home = () => {
  return (
    <>
      <section>
            <CustomCarousel />
      </section> 
      <div className="flex w-full flex-col gap-5 md:flex-row">
        {/* Replace these placeholders with actual components */}
        <div className='flex m-5'>
          <SearchBar />
        </div>
        <div>CategoryFilter</div>

        <Collection />
      </div> 
    </>
  )
}

export default Home