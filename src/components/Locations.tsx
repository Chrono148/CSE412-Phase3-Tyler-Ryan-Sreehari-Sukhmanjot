'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR, { Fetcher, preload } from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json());

const Locations = () => {
  const { data, error, isLoading } = useSWR('https://cse412-backend.ssree.dev/locations', fetcher);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

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
          {data.map((location, index) => { preload(`https://cse412-backend.ssree.dev/location/${location.id}`, fetcher); return (
            <tr className='informationRow' key={index}>
                <td className='td'><Link href={{ pathname: `/location/${location.id}` }}>{location.name}</Link></td>
                <td className='td'>{location.address}</td>
                <td className='td'>{location.loctype}</td>
                <td className='td'>{location.datefounded}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </>
  );
};

export default Locations;
