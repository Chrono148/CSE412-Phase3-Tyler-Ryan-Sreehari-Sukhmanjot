'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR, { Fetcher, preload } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Locations = () => {
  const { data: locations, error: locationsError, isLoading: locationsLoading } = useSWR(
    'https://cse412-backend.ssree.dev/locations',
    fetcher
  );

  const { data: employees, error: employeesError, isLoading: employeesLoading } = useSWR(
    'https://cse412-backend.ssree.dev/employee/pay/',
    fetcher
  );

  if (locationsLoading || employeesLoading) return <div>Loading...</div>;
  if (locationsError || employeesError) return <div>Failed to load!</div>;

  return (
    <>
      <h1>Locations</h1>
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
          {locations.map((location, index) => {
            preload(`https://cse412-backend.ssree.dev/location/${location.id}`, fetcher);
            return (
              <tr className='informationRow' key={index}>
                <td className='td'><Link href={{ pathname: `/location/${location.id}` }}>{location.name}</Link></td>
                <td className='td'>{location.address}</td>
                <td className='td'>{location.loctype}</td>
                <td className='td'>{location.datefounded}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h1>Payroll:</h1>
      <table>
        <thead>
          <tr className='tr'>
            <th className='th'>First Name</th>
            <th className='th'>Last Name</th>
            <th className='th'>Total Pay</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr className='informationRow' key={index}>
              <td className='td'>{employee.empfname}</td>
              <td className='td'>{employee.emplname}</td>
              <td className='td'>{employee.totalPay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Locations;
