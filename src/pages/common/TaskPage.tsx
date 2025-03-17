import React, { useState } from 'react'
import { Menu, X, Loader } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import CalendarHeader from '../../components/CalendarHeader'
import CalendarGrid from '../../components/CalendarGrid'
import CalendarSidebar from '../../components/CalendarSidebar'
import AddTaskModal from '../../components/AddTaskModal'
import { CalendarProvider, useCalendar } from '../../contexts/CalendarContext'
import EmployeSidebar from '@components/EmployeeSidebar'
import {  RootState } from '../../store/index';
import { useSelector } from 'react-redux'

  


// Create a wrapper component that will handle the loading state
const CalendarContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isLoading, error } = useCalendar()
  const { user } = useSelector((state: RootState) => state.auth);

  if (isLoading && !error) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader size={40} className="animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Loading calendar data...</p>
        </div>
      </div>
    )
  }

  // if (error && !isLoading) {
  //   return (
  //     <div className="flex-1 flex items-center justify-center h-screen">
  //       <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
  //         <div className="text-red-600 text-xl mb-2">Error Loading Data</div>
  //         <p className="text-gray-700">{error}</p>
  //         <button 
  //           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
  //           onClick={() => window.location.reload()}
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="flex h-screen">

{user && user.role === 'Manager' ? (
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
      ) : (
        <EmployeSidebar isSidebarOpen={isSidebarOpen} />
      )}
      
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
            <h2></h2>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <CalendarSidebar />

          {/* Main calendar */}
          <div className="flex-1 overflow-auto">
            <CalendarHeader />
            <CalendarGrid />
          </div>
        </div>

        {/* Task Modal */}
        <AddTaskModal />
      </div>
    </div>
  )
}

// Main Calendar component with Provider
const Calendar: React.FC = () => {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  )
}

export default Calendar