import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../index.css'; 

function PeriodCalendar(){
    const [data, setData] = useState([]);
    const [value, setValue] = useState(new Date());
    const [periods, setPeriods] = useState([]);

    useEffect(() => {
        // fetch('/all_periods')
        //     .then((response) => {
        //         console.log(response);
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then((calendarData) => {
        //         setPeriods(calendarData);
        //     })
        //     .catch((error) => console.error("error fetching calendar data:", error))
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

      return (
        <div className="calendar-container">
          <h2>my periods</h2>
          <Calendar
            onChange={setValue}
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
        </div>
      );
}

export default PeriodCalendar;