'use client';

import React, { useState, useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
const fetcher = async (params: Promise<{id: string}>) => fetch(`https://cse412-backend.ssree.dev/location/${(await params).id}`).then(res => res.json());

const LocationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { data, error, isLoading } = useSWR(params, fetcher);
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load!</div>

  return (
    <>
      <h2 className="text-center">{data.name}</h2>
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
