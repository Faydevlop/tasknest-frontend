import React from 'react'
import MiniCalendar from './MiniCalendar'

const CalendarSidebar: React.FC = () => {
  return (
    <div className="w-full md:w-64 border-r p-4 overflow-y-auto">
      {/* Mini calendar */}
      <MiniCalendar />

      {/* Search (mobile only) */}
      <div className="mt-4 mb-4 md:hidden">
        <div className="relative">
          <input
            className="h-9 px-3 py-2 rounded-md border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for tasks"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
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
              className="h-4 w-4 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarSidebar