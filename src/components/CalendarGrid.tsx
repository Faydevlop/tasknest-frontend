import React from 'react'
import { useCalendar } from '../contexts/CalendarContext'
import { getCalendarDays } from '../utils/dateUtils'
import CalendarDay from './CalendarDay'

const CalendarGrid: React.FC = () => {
  const { currentDate } = useCalendar()
  
  // Get all days for the current month's view
  const days = getCalendarDays(currentDate)
  
  // Group days into weeks
  const calendarWeeks: Date[][] = []
  let week: Date[] = []

  for (let i = 0; i < days.length; i++) {
    week.push(days[i])
    if (week.length === 7) {
      calendarWeeks.push(week)
      week = []
    }
  }
  
  return (
    <div className="grid grid-cols-7 h-full">
      {days.map((day, index) => (
        <CalendarDay key={index} day={day} currentMonth={currentDate} />
      ))}
    </div>
  )
}

export default CalendarGrid