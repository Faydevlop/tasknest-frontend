import React from 'react'
import { useCalendar } from '../contexts/CalendarContext'
import { getCalendarDays, getMonthName, isSameDay, isSameMonth, addMonths, cn } from '../utils/dateUtils'

const MiniCalendar: React.FC = () => {
  const { currentDate, setCurrentDate, selectedDate, setSelectedDate } = useCalendar()
  
  const pickerDays = getCalendarDays(currentDate)
  const weekDaysShort = ["S", "M", "T", "W", "T", "F", "S"]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-medium">
          {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-1">
          <button
            className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100"
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
            className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100"
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
      <div className="grid grid-cols-7 text-center text-xs mb-1">
        {weekDaysShort.map((day, i) => (
          <div key={i} className="h-6 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {pickerDays.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isSelected = isSameDay(day, selectedDate)

          return (
            <button
              key={i}
              className={cn(
                "h-6 w-6 text-xs flex items-center justify-center rounded-full",
                !isCurrentMonth && "text-gray-400",
                isSelected && "bg-blue-600 text-white font-medium",
                !isSelected && isCurrentMonth && "hover:bg-gray-100",
              )}
              onClick={() => {
                setSelectedDate(day)
                if (!isSameMonth(day, currentDate)) {
                  setCurrentDate(new Date(day.getFullYear(), day.getMonth(), 1))
                }
              }}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MiniCalendar