'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";

const LocationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [locname, setLocname] = useState('');
  const [bizcarddata, setbizcarddata] = useState(null);
  const [employees, setEmployees] = useState([]);

  const fetcher = async () => {
    try {
      const res = await fetch(`https://cse412-backend.ssree.dev/location/${(await params).id}`);
      const data = await res.json();
      setLocname(data.name);
      // todo, change localhost back to ssree.dev when everything is pushed
      const biz_res = await fetch(`http://localhost:6969/businesscontact/${(await params).id}`);
      const biz_data = await biz_res.json();
      setbizcarddata(biz_data);
      // todo, change localhost back to ssree.dev when everything is pushed
      const empRes = await fetch(`http://localhost:6969/employeelist/${(await params).id}`);
      const empData = await empRes.json();
      setEmployees(empData);
    } catch (err) {
      console.error('Error fetching data:', err);
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
              <div id="BCfname"> {bizcarddata?.fname || ''}</div>
            </li>
            <li>Last Name: 
              <div id="BClname"> {bizcarddata?.lname || ''}</div>
            </li>
            <li>Email Address: 
              <a id="BCemail"> {bizcarddata?.email || ''}</a>
            </li>
            <li>Website: 
              <a id="BCwebsite"> {bizcarddata?.website || ''}</a>
            </li>
            <li>Phone Number: 
              <div id="BCpnum"> {bizcarddata?.phone || ''}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="sections">Employees:</div>
      <div className="content">
        <div className="employeeInfo">
          {employees.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>

                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.empfname}</td>
                    <td>{employee.emplname}</td>
                    <td>
                      <a href={`mailto:${employee.email || ''}`}>
                        {employee.email || 'N/A'}
                      </a>
                    </td>
                    <td><Link href={{ pathname: `/employee/${employee.empnum}` }}>Schedule</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (<p>No employees listed.</p>)}
        </div>
      </div>
    </>
  )
};

export default LocationPage;
