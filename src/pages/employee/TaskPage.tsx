
import { useState } from "react"
import EmployeSidebar from "../../components/EmployeSidebar"
import { Menu, X } from "lucide-react"

// Task type definition
type Task = {
  id: string
  title: string
  description: string
  date: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
}

// Sample tasks data
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Draft and finalize the project proposal for the client meeting",
    date: "2025-03-15",
    status: "todo",
    priority: "high",
  },
  {
    id: "2",
    title: "Review code changes",
    description: "Review pull requests and provide feedback",
    date: "2025-03-15",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "3",
    title: "Team meeting",
    description: "Weekly team sync to discuss progress and blockers",
    date: "2025-03-16",
    status: "todo",
    priority: "medium",
  },
  {
    id: "4",
    title: "Update documentation",
    description: "Update the user guide with the latest features",
    date: "2025-03-17",
    status: "todo",
    priority: "low",
  },
  {
    id: "5",
    title: "Client presentation",
    description: "Present the project progress to the client",
    date: "2025-03-18",
    status: "todo",
    priority: "high",
  },
]

export default function TaskManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for current date and month
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>(sampleTasks)

  // Calendar navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Format date to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Format date to display format
  const formatDisplayDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  // Check if a date has tasks
  const hasTasksOnDate = (date: Date): boolean => {
    const dateStr = formatDate(date)
    return tasks.some((task) => task.date === dateStr)
  }

  // Filter tasks based on selected date
  const filteredTasks = tasks.filter((task) => task.date === formatDate(selectedDate))

  // Handle task selection
  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task)
  }

  // Handle task status update
  const handleStatusUpdate = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))

    // Update selected task if it's the one being modified
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({ ...selectedTask, status: newStatus })
    }
  }

  // Generate calendar days
  const generateCalendarDays = () => {


    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Array to hold all calendar days
    const calendarDays = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day))
    }

    return calendarDays
  }

  // Get status icon based on task status
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        )
      case "in-progress":
        return (
          <svg
            className="w-5 h-5 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        )
      default:
        return (
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        )
    }
  }

  // Get priority class based on task priority
  const getPriorityClass = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 "
      case "medium":
        return "bg-amber-100 text-amber-800  "
      default:
        return "bg-green-100 text-green-800  "
    }
  }

  // Get status class based on task status
  const getStatusClass = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800  "
      case "in-progress":
        return "bg-amber-100 text-amber-800 "
      default:
        return "bg-gray-100 text-gray-800  "
    }
  }

  return (
    <main className="flex h-screen">

<EmployeSidebar isSidebarOpen={isSidebarOpen} />

 {/* Mobile Sidebar Toggle */}
 <div className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg">
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

    <div className="flex-1 p-6 bg-gray-50 overflow-auto">

      <h1 className="text-3xl font-bold mb-6">Task Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white  rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Calendar</h2>
              <div className="flex space-x-2">
                <button onClick={prevMonth} className="p-2 rounded-md hover:bg-gray-100 ">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button onClick={nextMonth} className="p-2 rounded-md hover:bg-gray-100 ">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h3>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 ">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => (
                <div key={index} className="aspect-square">
                  {day ? (
                    <button
                      onClick={() => setSelectedDate(day)}
                      className={`w-full h-full flex items-center justify-center rounded-md text-sm
                        ${
                          isSameDay(day, selectedDate)
                            ? "bg-blue-500 text-white"
                            : hasTasksOnDate(day)
                              ? "bg-blue-100  font-medium"
                              : "hover:bg-gray-100 "
                        }`}
                    >
                      {day.getDate()}
                    </button>
                  ) : (
                    <div className="w-full h-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Task List Section */}
          <div className="bg-white  rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {filteredTasks.length > 0 ? `Tasks (${filteredTasks.length})` : "No tasks for selected date"}
              </h2>
              <div className="text-sm text-gray-500 ">
                {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 ">No tasks scheduled for this date</div>
            ) : (
              <ul className="space-y-3">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    onClick={() => handleTaskSelect(task)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedTask?.id === task.id
                        ? "border-blue-500 bg-blue-50 "
                        : "hover:bg-gray-50 "
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className="font-medium">{task.title}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Task Details Section */}
        <div className="lg:col-span-8">
          <div className="bg-white   rounded-lg shadow p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Task Details</h2>

            {!selectedTask ? (
              <div className="flex items-center justify-center h-64 text-gray-500 ">
                Select a task to view details
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold">{selectedTask.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <div className="flex items-center text-sm text-gray-500 ">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      {formatDisplayDate(selectedTask.date)}
                    </div>
                    <div className={`text-sm px-2 py-1 rounded-full ${getStatusClass(selectedTask.status)}`}>
                      {selectedTask.status.replace("-", " ")}
                    </div>
                    <div className={`text-sm px-2 py-1 rounded-full ${getPriorityClass(selectedTask.priority)}`}>
                      {selectedTask.priority} priority
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50  p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2 text-gray-700 ">Description</h4>
                  <p className="text-gray-600 ">{selectedTask.description}</p>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-3 text-gray-700 ">Update Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedTask.id, "todo")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedTask.status === "todo"
                          ? "bg-gray-200 "
                          : "bg-gray-100 hover:bg-gray-200 "
                      }`}
                    >
                      To Do
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedTask.id, "in-progress")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedTask.status === "in-progress"
                          ? "bg-amber-200 "
                          : "bg-amber-100 hover:bg-amber-200 "
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedTask.id, "completed")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedTask.status === "completed"
                          ? "bg-green-200 "
                          : "bg-green-100 hover:bg-green-200 "
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </main>
  )
}

