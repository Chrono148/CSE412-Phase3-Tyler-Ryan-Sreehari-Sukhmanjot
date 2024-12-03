import React from 'react';
import Locations from '~/components/Locations'
import ReactDOM from 'react-dom'


const Home = () => {
  ReactDOM.preload("https://cse412-backend.ssree.dev/locations");

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
