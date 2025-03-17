import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';

import EmployeSidebar from '@components/EmployeSidebar';
import AdminSidebar from '../../components/AdminSidebar';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { TaskAPI } from '../../services/api';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<{ totalTasks?: number; completedTasks?: number; totalEmployees?: number }>({})


  const handlefetchInfo = async()=>{
    const data = await TaskAPI.getInfo()
    setData(data.info)
    console.log(data);
    
  }

  useEffect(()=>{
    handlefetchInfo()

  },[])



  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      {user && user.role === 'Manager' ? (
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
      ) : (
        <EmployeSidebar isSidebarOpen={isSidebarOpen} />
      )}
      

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {data && (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="inline-block p-3 rounded-lg text-white mb-4 bg-blue-500">
          <LayoutDashboard size={24} />
        </div>
        <h3 className="text-gray-500 text-sm">Total Tasks</h3>
        <p className="text-2xl font-bold text-gray-800">{data.totalTasks}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="inline-block p-3 rounded-lg text-white mb-4 bg-green-500">
          <LayoutDashboard size={24} />
        </div>
        <h3 className="text-gray-500 text-sm">Tasks Completed</h3>
        <p className="text-2xl font-bold text-gray-800">{data.completedTasks}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="inline-block p-3 rounded-lg text-white mb-4 bg-purple-500">
          <LayoutDashboard size={24} />
        </div>
        <h3 className="text-gray-500 text-sm">Total Employees</h3>
        <p className="text-2xl font-bold text-gray-800">{data.totalEmployees}</p>
      </div>
    </>
  )}
</div>

           
        </div>
      </div>
    </div>
  );
}

export default Dashboard;