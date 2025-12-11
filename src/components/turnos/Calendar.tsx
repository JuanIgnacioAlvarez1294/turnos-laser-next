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
    <div className="w-full max-w-md mx-auto p-4">
      <div className="rounded-2xl shadow-xl border border-pink-200 overflow-hidden bg-white">

        <ReactCalendar
          onChange={handleDateChange}
          className="custom-calendar"
        />

      </div>

      {/* ESTILOS CUSTOM */}
      <style jsx global>{`
        /* CONTENEDOR PRINCIPAL */
        .custom-calendar {
          width: 100%;
          border: none !important;
          background: white;
          padding: 1rem;
        }

        /* HEADER DEL CALENDARIO */
        .custom-calendar .react-calendar__navigation button {
          background: transparent;
          color: #d63384; /* rosa */
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 10px;
          margin-bottom: 8px;
        }

        .custom-calendar .react-calendar__navigation button:hover {
          background: #fde0eb;
        }

        /* SEMANAS */
        .custom-calendar .react-calendar__month-view__weekdays {
          text-transform: capitalize;
          color: #d63384;
          font-weight: 600;
        }

        /* CUADRITOS */
        .custom-calendar .react-calendar__tile {
          border-radius: 12px;
          padding: 10px 6px;
          font-size: 0.95rem;
          transition: 0.2s ease;
        }

        .custom-calendar .react-calendar__tile:hover {
          background: #ffe3ef !important;
        }

        /* DÍA SELECCIONADO */
        .custom-calendar .react-calendar__tile--active {
          background: #d63384 !important;
          color: white !important;
          border-radius: 12px;
        }

        /* HOY */
        .custom-calendar .react-calendar__tile--now {
          background: #ffe6f2;
          border: 1px solid #f7c3d8;
          border-radius: 12px;
        }

        /* DÍAS FUERA DEL MES */
        .custom-calendar .react-calendar__month-view__days__day--neighboringMonth {
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
