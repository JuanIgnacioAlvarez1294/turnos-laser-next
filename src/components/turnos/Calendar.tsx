'use client';

import React from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Definimos los tipos posibles que devuelve react-calendar
type CalendarValue = Date | null | [Date | null, Date | null];

interface CalendarProps {
  onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  
  const handleDateChange = (value: CalendarValue) => {
    // Si es una fecha simple
    if (value instanceof Date) {
      onDateChange(value);
    } 
    // Si es un rango (tomamos la primera fecha)
    else if (Array.isArray(value) && value[0] instanceof Date) {
      onDateChange(value[0]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="rounded-2xl shadow-xl border border-pink-200 overflow-hidden bg-white">
        <ReactCalendar
          onChange={handleDateChange}
          className="custom-calendar"
        />
      </div>

      {/* Cambiamos <style jsx global> por una etiqueta style estándar.
          Esto soluciona el error de ESLint y mantiene tus estilos.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-calendar {
          width: 100% !important;
          border: none !important;
          background: white;
          padding: 1rem;
          font-family: inherit;
        }

        .custom-calendar .react-calendar__navigation button {
          background: transparent;
          color: #d63384;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 10px;
          margin-bottom: 8px;
        }

        .custom-calendar .react-calendar__navigation button:hover {
          background: #fde0eb;
        }

        .custom-calendar .react-calendar__month-view__weekdays {
          text-transform: capitalize;
          color: #d63384;
          font-weight: 600;
          text-decoration: none;
        }

        .custom-calendar .react-calendar__tile {
          border-radius: 12px;
          padding: 10px 6px;
          font-size: 0.95rem;
          transition: 0.2s ease;
        }

        .custom-calendar .react-calendar__tile:hover {
          background: #ffe3ef !important;
        }

        .custom-calendar .react-calendar__tile--active {
          background: #d63384 !important;
          color: white !important;
          border-radius: 12px;
        }

        .custom-calendar .react-calendar__tile--now {
          background: #ffe6f2;
          border: 1px solid #f7c3d8;
          border-radius: 12px;
        }

        .custom-calendar .react-calendar__month-view__days__day--neighboringMonth {
          opacity: 0.4;
        }
      `}} />
    </div>
  );
};

export default Calendar;