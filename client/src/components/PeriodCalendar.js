import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Link } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import '../index.css'; 

function PeriodCalendar({ selectedPeriod, setSelectedPeriod }) {
  const [periods, setPeriods] = useState([]);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    fetch('/all_periods')
      .then((response) => response.json())
      .then((calendarData) => {
        setPeriods(calendarData); // Set periods from fetched data
      })
      .catch((error) => console.error("error fetching calendar data:", error));
  }, []);

  const getPeriodsForDate = (date) => {
    return periods.filter((period) => {
      const startDate = new Date(period.start_date);
      const endDate = new Date(period.end_date);
      return date >= startDate && date <= endDate; // Filter periods for the given date (inclusive)
    });
  };

  const handleDateClick = (date) => {
    const periodsOnThisDate = getPeriodsForDate(date);
    if (periodsOnThisDate.length > 0) {
      setSelectedPeriod(periodsOnThisDate[0]); // Set the first period found
    } else {
      setSelectedPeriod(null); 
    }
    setValue(date);
  };

  // Helper function to get all dates between two dates
  const getAllDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate)); // Push a copy of the date
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
    return dates;
  };

  return (
    <div className="calendar-container">
      <h2>my periods</h2>
      <br />
      <Calendar
        onChange={handleDateClick}
        value={value}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            // Create an array of all dots to show based on periods
            const periodsWithDots = periods.filter(period => {
              const startDate = new Date(period.start_date);
              const endDate = new Date(period.end_date);
              const allDatesInPeriod = getAllDatesBetween(startDate, endDate);
              return allDatesInPeriod.some(d => d.toDateString() === date.toDateString());
            });

            return (
              <div>
                {periodsWithDots.length > 0 && <span className="period-dot">✤</span>}
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
            <br />
            <p>✤✤✤✤✤</p>
            <br />
            <h2>period details</h2>
            <p>start date: {new Date(selectedPeriod.start_date).toLocaleDateString()}</p>
            <p>end date: {new Date(selectedPeriod.end_date).toLocaleDateString()}</p>
            <p>notes: {selectedPeriod.notes}</p>
            <p>
              symptoms: {selectedPeriod.symptoms && selectedPeriod.symptoms.length > 0
              ? selectedPeriod.symptoms.map(symptom => `${symptom.name} - ${symptom.severity}`).join(', ')
              : 'No symptoms recorded'}
              </p>
            <br />
            <p>✤✤✤✤✤</p>
            <br />
            <Link 
              to="/add_symptom" 
              className='button' 
              state={{ selectedPeriod: selectedPeriod }}
            >
              add a symptom to this period
            </Link>
            <br />
            <Link
              to={`/periods/${selectedPeriod.id}/symptoms/delete`} 
              className="button"
            >
              delete a symptom from this period
            </Link>
            <br />
            <br />
            <Link to={`/periods/:period_id/edit`} className="button">edit this period</Link>
            <br />
            <Link to={`/periods/${selectedPeriod.id}/delete`} className="button">delete this period entirely</Link>
          </div>
        ) : (
          // Show message only if no period is selected and the clicked date is not a start date of a period
          getPeriodsForDate(value).length === 0 && <p>select a date with a period to view its details.</p>
        )}
      </div>
    </div>
  );
}

export default PeriodCalendar;


