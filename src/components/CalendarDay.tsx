import React, { useState } from 'react'
import { useCalendar } from '../contexts/CalendarContext'
import { formatDate, isSameDay, isSameMonth, cn } from '../utils/dateUtils'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import IndependentTaskModal from './ViewTaskModal'

interface CalendarDayProps {
  day: Date
  currentMonth: Date
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, currentMonth }) => {
  const { selectedDate, tasks, setModalDate, setIsModalOpen } = useCalendar()
  const { user } = useSelector((state: RootState) => state.auth);

  const [selectedTask, setSelectedTask] = useState(null);
const [isModalOpen, setModalOpen] = useState(false);

  
  const isCurrentMonth = isSameMonth(day, currentMonth)
  const isToday = isSameDay(day, selectedDate)
  const dateString = formatDate(day)
  const dayTasks = tasks.filter(task => formatDate(new Date(task.date)) === dateString)

  const handleOpenModal = (task:any) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  
  const handleClick = () => {
    if(user?.role === 'Manager'){
        setModalDate(day)
    setIsModalOpen(true)
    }
    
  }
  
  return (
    <div
      className={cn(
        "min-h-[100px] border-b border-r p-1 relative cursor-pointer",
        !isCurrentMonth && "bg-gray-50 text-gray-400",
      )}
      
    >
      <div 
      onClick={handleClick}
      className="flex justify-between items-start">
        <span
          className={cn(
            "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
            isToday ? "bg-blue-600 text-white font-medium" : "",
          )}
        >
          {day.getDate()}
        </span>
      </div>

      
      <div className="mt-1 space-y-1 text-xs">
       

        {/* Tasks */}
        {dayTasks.map((task) => (
  <div
    onClick={(e) => {
      e.stopPropagation(); // Stops the click from reaching the parent
      
      handleOpenModal(task)
    }}
    key={task.title}
    className="px-1 py-0.5 rounded m-1 bg-blue-100 text-blue-800 truncate"
  >
    {task.title}
  </div>
))}

{isModalOpen && (
  <IndependentTaskModal
    task={selectedTask}
    onClose={handleCloseModal}
    
  />
)}
      </div>
    </div>
  )
}

export default CalendarDay