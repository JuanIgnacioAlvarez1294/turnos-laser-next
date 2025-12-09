import React from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar: React.FC<{ onDateChange: (date: Date) => void }> = ({ onDateChange }) => {
  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      onDateChange(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      onDateChange(value[0]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <ReactCalendar
        onChange={handleDateChange}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default Calendar;