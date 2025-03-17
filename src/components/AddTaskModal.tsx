import React from 'react'
import { useCalendar } from '../contexts/CalendarContext'
import { formatDisplayDate, cn } from '../utils/dateUtils'
import { RootState } from '../store'
import { useSelector } from 'react-redux'

const AddTaskModal: React.FC = () => {
  const { 
    isModalOpen, 
    setIsModalOpen, 
    modalDate, 
    taskTitle, 
    setTaskTitle, 
    addTask,
    isLoading,
    error,
    taskDescription, setTaskDescription, taskStatus, setTaskStatus, assignedTo, setAssignedTo,users
  } = useCalendar()
  const { user } = useSelector((state: RootState) => state.auth);


  // If modal is not open or no date is selected, don't render
  if (!isModalOpen || !modalDate) return null

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (taskTitle.trim() && modalDate) {
      addTask(modalDate, taskTitle,taskDescription,taskStatus,assignedTo)
      console.log(taskTitle,taskDescription,taskStatus,assignedTo,modalDate);
      
    }
  }

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Add Task for {formatDisplayDate(modalDate)}</h3>
          <button
            onClick={() => {
              setIsModalOpen(false)
              setTaskTitle("")
            }}
            className="text-gray-400 hover:text-gray-500"
            disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
  <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">
    Description
  </label>
  <textarea
    id="task-description"
    placeholder="Enter task description"
    value={taskDescription}
    onChange={(e) => setTaskDescription(e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    disabled={isLoading}
  />
</div>

{/* Task Status */}
<div className="mb-4">
  <label htmlFor="task-status" className="block text-sm font-medium text-gray-700 mb-1">
    Status
  </label>
  <select
    id="task-status"
    value={taskStatus}
    onChange={(e) => setTaskStatus(e.target.value as "pending" | "completed" | "in-progress")}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    disabled={isLoading}
  >
    <option value="pending">Pending</option>
   
  </select>
</div>

{/* Assigned To */}
<div>
    <label htmlFor="assignedTo">Assign To:</label>
    <select 
      id="assignedTo" 
      value={assignedTo} 
      onChange={(e) => setAssignedTo(e.target.value)}
    >
      <option value="">Select User</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
        
      ))}
      <option value={user?._id}>{user?.name}(You)</option>
    </select>
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
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!taskTitle.trim() || isLoading}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                taskTitle.trim() && !isLoading ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 cursor-not-allowed",
              )}
            >
              {isLoading ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal