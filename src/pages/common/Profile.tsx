import {Edit, Menu, X} from 'lucide-react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import AdminSidebar from '../../components/AdminSidebar';
import EmployeSidebar from '@components/EmployeeSidebar'

const Profile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);


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

     

      {/* Profile Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={user && user.avatar ? user.avatar : ''}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-700"
          />
        </div>

        {/* User Info */}
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold">{ user && user.name}</h2>
          <p className="text-gray-400">{ user && user.email}</p>
          <p className="text-gray-300 mt-2">{ user && user.role}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-4 w-full max-w-xs">
          <button className="flex items-center justify-center text-white w-full bg-blue-500 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all">
            <Edit className="w-5 h-5 mr-2" />
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  )
}

export default Profile
