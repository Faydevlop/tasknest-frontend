
import { useState } from "react"
import AdminSidebar from '../../components/AdminSidebar';
import { Menu, X } from "lucide-react";

// Date utility functions

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]



function getMonthName(month: number): string {
  return MONTH_NAMES[month]
}


function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

function formatDisplayDate(date: Date): string {
  return `${getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

function isSameMonth(date1: Date, date2: Date): boolean {
  return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}

function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date)
  const currentMonth = newDate.getMonth()
  newDate.setMonth(currentMonth + months)
  return newDate
}

function startOfMonth(date: Date): Date {
  const newDate = new Date(date)
  newDate.setDate(1)
  return newDate
}

function endOfMonth(date: Date): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + 1)
  newDate.setDate(0)
  return newDate
}

function getCalendarDays(date: Date): Date[] {
  const days: Date[] = []
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)

  // Start from the first day of the week that contains the first day of the month
  const startDate = new Date(monthStart)
  startDate.setDate(startDate.getDate() - startDate.getDay())

  // End on the last day of the week that contains the last day of the month
  const endDate = new Date(monthEnd)
  const daysToAdd = 6 - endDate.getDay()
  endDate.setDate(endDate.getDate() + daysToAdd)

  // Generate all days
  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return days
}

// Utility function to conditionally join class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// Sample data for tasks and events
const INITIAL_EVENTS = [

  { id: 11, date: "2025-03-31", title: "Ramzan Id/Eid-ul-Fitar", color: "bg-green-600" },
]

const INITIAL_TASKS = [{ id: 1, date: "2025-03-16", title: "1 pending task", completed: false }]


// Main Calendar Component
export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)) // March 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 16)) // March 16, 2025
  const [events, setEvents] = useState(INITIAL_EVENTS)
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDate, setModalDate] = useState<Date | null>(null)
  const [taskTitle, setTaskTitle] = useState("")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  // Get all days for the calendar grid
  const days = getCalendarDays(currentDate)

  // Group days into weeks
  const calendarDays: Date[][] = []
  let week: Date[] = []

  for (let i = 0; i < days.length; i++) {
    week.push(days[i])
    if (week.length === 7) {
      calendarDays.push(week)
      week = []
    }
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = formatDate(date)
    return events.filter((event) => event.date === dateStr)
  }

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    const dateStr = formatDate(date)
    return tasks.filter((task) => task.date === dateStr)
  }

  // Handle day click to open task modal
  const handleDayClick = (date: Date) => {
    setModalDate(date)
    setIsModalOpen(true)
  }

  // Add a new task
  const addTask = (date: Date, title: string) => {
    const newTask = {
      id: tasks.length + 1,
      date: formatDate(date),
      title,
      completed: false,
    }
    setTasks([...tasks, newTask])
    setIsModalOpen(false)
    setTaskTitle("")
  }

  // Handle task form submission
  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (taskTitle.trim() && modalDate) {
      addTask(modalDate, taskTitle)
    }
  }

  // Day of week headers
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  // Calendar Picker Component (inline)
  const CalendarPicker = () => {
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

  return (
    <div className="flex h-screen">


<AdminSidebar isSidebarOpen={isSidebarOpen} />
    
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

<div className="flex-1 p-6 bg-gray-50 overflow-auto">
      {/* Header */}
      <header className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
         <h2>  </h2>
        </div>
       
      </header>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-r p-4 overflow-y-auto">
          {/* Mini calendar */}
          <CalendarPicker />

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

        {/* Main calendar */}
        <div className="flex-1 overflow-auto">
          {/* Calendar header */}
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

          {/* Calendar grid */}
          <div className="grid grid-cols-7 h-full">
            {calendarDays.flat().map((day, i) => {
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isToday = isSameDay(day, selectedDate)
              const dayEvents = getEventsForDate(day)
              const dayTasks = getTasksForDate(day)

              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-[100px] border-b border-r p-1 relative cursor-pointer",
                    !isCurrentMonth && "bg-gray-50 text-gray-400",
                  )}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                        isToday ? "bg-blue-600 text-white font-medium" : "",
                      )}
                    >
                      {day.getDate()}
                    </span>
                  </div>

                  {/* Events */}
                  <div className="mt-1 space-y-1 text-xs">
                    {dayEvents.map((event) => (
                      <div key={event.id} className={cn("px-1 py-0.5 rounded text-white truncate", event.color)}>
                        {event.title}
                      </div>
                    ))}

                    {/* Tasks */}
                    {dayTasks.map((task) => (
                      <div key={task.id} className="px-1 py-0.5 rounded bg-blue-100 text-blue-800 truncate">
                        {task.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && modalDate && (
        <div className="fixed inset-0 bg-balck bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium">Add Task for {formatDisplayDate(modalDate)}</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setTaskTitle("")
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleTaskSubmit}>
              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                  </label>
                  <input
                    id="task-title"
                    type="text"
                    placeholder="Enter task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 p-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setTaskTitle("")
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!taskTitle.trim()}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    taskTitle.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 cursor-not-allowed",
                  )}
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

