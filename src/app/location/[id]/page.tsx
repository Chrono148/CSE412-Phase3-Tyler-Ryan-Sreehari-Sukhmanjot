'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from "next/link";

const fetcher = async (params: Promise<{ id: string }>) =>
  fetch(`https://cse412-backend.ssree.dev/location/${(await params).id}`).then(res => res.json());

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const LocationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [locname, setLocname] = useState('');
  const [bizcarddata, setbizcarddata] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Sunday'); // Default day is Sunday
  const [dayEmployees, setDayEmployees] = useState([]);

  const fetcher = async () => {
    try {
      const res = await fetch(`https://cse412-backend.ssree.dev/location/${(await params).id}`);
      const data = await res.json();
      setLocname(data.name);

      const biz_res = await fetch(`http://localhost:6969/businesscontact/${(await params).id}`);
      const biz_data = await biz_res.json();
      setbizcarddata(biz_data);

      const empRes = await fetch(`http://localhost:6969/employeelist/${(await params).id}`);
      const empData = await empRes.json();
      setEmployees(empData);

      // Fetch employees working on the default selected day
      fetchDayEmployees('Sunday');
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const fetchDayEmployees = async (day: string) => {
    try {
      const res = await fetch(`http://localhost:6969/employee/${(await params).id}/${day}`);
      const data = await res.json();
      setDayEmployees(data);
    } catch (err) {
      console.error('Error fetching employees for the day:', err);
      setDayEmployees([]);
    }
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = event.target.value;
    setSelectedDay(selectedDay);
    fetchDayEmployees(selectedDay);
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
            <li>First Name: <div id="BCfname">{bizcarddata?.fname || ''}</div></li>
            <li>Last Name: <div id="BClname">{bizcarddata?.lname || ''}</div></li>
            <li>Email Address: <a id="BCemail">{bizcarddata?.email || ''}</a></li>
            <li>Website: <a id="BCwebsite">{bizcarddata?.website || ''}</a></li>
            <li>Phone Number: <div id="BCpnum">{bizcarddata?.phone || ''}</div></li>
          </ul>
        </div>
      </div>

      <div className="sections">Employees:</div>
      <div className="content">
        <div className="day-selector">
          <label htmlFor="dayDropdown">Select a day:</label>
          <select id="dayDropdown" value={selectedDay} onChange={handleDayChange}>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="employeeList">
          <h3>Employees working on {selectedDay}:</h3>
          {dayEmployees.length > 0 ? (
            <ul>
              {dayEmployees.map((employee, index) => (
                <li key={index}>
                  {employee.empfname} {employee.emplname}
                </li>
              ))}
            </ul>
          ) : (
            <p>No employees scheduled for this day.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationPage;
