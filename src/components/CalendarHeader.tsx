import React from 'react'
import { useCalendar } from '../contexts/CalendarContext'
import { getMonthName, addMonths } from '../utils/dateUtils'

const CalendarHeader: React.FC = () => {
  const { currentDate, setCurrentDate } = useCalendar()
  
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  
  return (
    <div className="sticky top-0 bg-white z-10">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">
          {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="h-9 w-9 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
            onClick={() => setCurrentDate(addMonths(currentDate, -1))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            className="h-9 w-9 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day, i) => (
          <div key={i} className="p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarHeader