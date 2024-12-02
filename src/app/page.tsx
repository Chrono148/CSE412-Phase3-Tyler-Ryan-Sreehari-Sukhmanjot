import React from 'react';
import Locations from '~/components/Locations'

const Home = () => {
  return (
    <>
      <h1 className="text-center">Restaurant Manager</h1>
      <h6 className="text-center">By: Tyler Tannenbaum, Ryan Swart, Sreehari Sreedev, and Sukhmanjot Singh</h6>
      <div className="sections">Locations:</div>
      <div className="content">
        <Locations />
      </div>
    </>
  )
}

export default Home;
