import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../index.css'; 

function PeriodCalendar() {
  const [periods, setPeriods] = useState([]);
  const [value, setValue] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState(null); 

  useEffect(() => {
    fetch('/all_periods')
      .then((response) => response.json())
      .then((calendarData) => {
        setPeriods(calendarData);
      })
      .catch((error) => console.error("error fetching calendar data:", error));
  }, []);

  const getPeriodsForDate = (date) => {
    return periods.filter((period) => {
      const startDate = new Date(period.start_date);
      const endDate = new Date(period.end_date);
      return date >= startDate && date <= endDate;
    });
  };

  const handleDateClick = (date) => {
    const periodsOnThisDate = getPeriodsForDate(date);
    if (periodsOnThisDate.length > 0) {
      setSelectedPeriod(periodsOnThisDate[0]);
    } else {
      setSelectedPeriod(null); 
    }
    setValue(date);
  };

  return (
    <div className="calendar-container">
      <h2>my periods</h2>
      <br></br>
      <Calendar
        onChange={handleDateClick}
        value={value}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const periodsOnThisDate = getPeriodsForDate(date);
            return (
              <div>
                {periodsOnThisDate.length > 0 && <span className="period-dot">✤</span>}
              </div>
            );
          }
        }}
        tileClassName={({ date, view }) => {
          if (view === 'month' && getPeriodsForDate(date).length > 0) {
            return 'period-day'; 
          }
        }}
      />

      <div className="selected-period-details">
        {selectedPeriod ? (
          <div>
            <br></br>
            <h2>period details</h2>
            <p>start date: {new Date(selectedPeriod.start_date).toLocaleDateString()}</p>
            <p>end date: {new Date(selectedPeriod.end_date).toLocaleDateString()}</p>
            <p>symptoms: {selectedPeriod.symptoms}</p>
            <p>notes: {selectedPeriod.notes}</p>
          </div>
        ) : (
          <p>select a date with a period to view its details.</p>
        )}
      </div>
    </div>
  );
}

export default PeriodCalendar;
