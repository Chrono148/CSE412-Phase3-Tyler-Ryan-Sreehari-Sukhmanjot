'use client';

import React, { useState, useEffect } from 'react';

const LocationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [employeedata, setEmployeedata] = useState(null);

  const fetcher = async () => {
    try {
      // todo, change localhost back to ssree.dev when everything is pushed
      console.log('hello!');
      console.log((await params).id);
      const empRes = await fetch(`http://localhost:6969/employee/${(await params).id}`);
      const empData = await empRes.json();
      console.log(empData);
      setEmployeedata(empData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  if (!employeedata) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2 className="text-center">{employeedata.empfname} {employeedata.emplname}</h2>
      <div className="sections">Schedule:</div>
      <div className="content">
        <p>foobarbaz</p>
      </div>
    </>
  )
};

export default LocationPage;
