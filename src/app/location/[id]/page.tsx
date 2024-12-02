'use client';

import React, { useState, useEffect } from 'react';

const LocationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [locname, setLocname] = useState('');

  const fetcher = async () => {
    try {
      const res = await fetch(`https://cse412-backend.ssree.dev/location/${(await params).id}`);
      const data = await res.json();
      setLocname(data.name);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <>
      <h2 className="text-center">{locname}</h2>
      <div className="sections">Location Contact:</div>
      <div className="content">
        <div className="businessCard">
          <ul>
            <li>First Name: 
              <div id="BCfname"></div>
            </li>
            <li>Last Name: 
              <div id="BClname"></div>
            </li>
            <li>Email Address: 
              <a id="BCemail" href= "mailto: name@email.com"> name@email.com </a>
            </li>
            <li>Website: 
              <a id="BCwebsite" href="https://www.mcdonalds.com/us/en-us.html" target="_blank">https://www.mcdonalds.com/us/en-us.html</a>
            </li>
            <li>Phone Number: 
              <div id="BCpnum"></div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
};

export default LocationPage;
