'use client';

import React, { useState, useEffect } from 'react';

const LocationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [employeedata, setEmployeedata] = useState(null);
  const [scheduledata, setScheduledata] = useState([]);

  const fetcher = async () => {
    try {
      // Fetch employee and schedule data
      const empRes = await fetch(`http://localhost:6969/employee/${(await params).id}`);
      const empData = await empRes.json();
      const schRes = await fetch(`http://localhost:6969/schedule/${(await params).id}`);
      const schData = await schRes.json();
      setEmployeedata(empData);
      setScheduledata(schData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const deleteSchedule = async (schednum: number) => {
    try {
      const response = await fetch(`http://localhost:6969/schedule/del/${schednum}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete schedule');
      }

      // Update local state by removing the deleted schedule
      setScheduledata(prevData => prevData.filter(shift => shift.schnum !== schednum));
    } catch (err) {
      console.error('Error deleting schedule:', err);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  if (!employeedata || !scheduledata) {
    return <p>Loading...</p>;
  }

  // Organize schedule data by day of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const scheduleByDay = daysOfWeek.map(day => ({
    day,
    shifts: scheduledata.filter(shift => shift.schday === day),
  }));

  return (
    <>
      <h2 className="text-center">
        {employeedata.empfname} {employeedata.emplname}'s Weekly Schedule
      </h2>
      <div className="schedule-container">
        {scheduleByDay.map(({ day, shifts }) => (
          <div key={day} className="day-schedule">
            <h3>{day}</h3>
            {shifts.length > 0 ? (
              shifts.map((shift, index) => (
                <div key={index} className="shift">
                  <p>
                    <strong>Time:</strong> {shift.schstarttime} - {shift.schendtime}
                  </p>
                  <p>
                    <strong>Pay:</strong> ${shift.schpay.toFixed(2)}
                  </p>
                  <button
                    className="delete-button"
                    onClick={() => deleteSchedule(shift.schnum)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No shifts scheduled.</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default LocationPage;
