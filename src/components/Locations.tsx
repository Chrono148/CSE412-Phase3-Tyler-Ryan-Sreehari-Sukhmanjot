'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Locations = () => {
  const [locations, setLocations] = useState([]);

  const fetcher = async () => {
    try {
      const res = await fetch('https://cse412-backend.ssree.dev/locations');
      const data = await res.json();
      setLocations([...locations, ...data]);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr className='tr'>
            <th className='th'>Name</th>
            <th className='th'>Address</th>
            <th className='th'>Type</th>
            <th className='th'>Date Founded</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr className='informationRow' key={index}>
                <td className='td'><Link href={{ pathname: `/location/${location.id}` }}>{location.name}</Link></td>
                <td className='td'>{location.address}</td>
                <td className='td'>{location.loctype}</td>
                <td className='td'>{location.datefounded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Locations;
