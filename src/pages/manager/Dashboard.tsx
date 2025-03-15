import { useState } from 'react';
import {
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats = [
    { title: 'Total Tasks', value: '156', color: 'bg-blue-500' },
    { title: 'Tasks Completed', value: '89', color: 'bg-green-500' },
    { title: 'Total Employees', value: '34', color: 'bg-purple-500' }
  ];


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
      <AdminSidebar isSidebarOpen={isSidebarOpen}  />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className={`inline-block p-3 ${stat.color} rounded-lg text-white mb-4`}>
                  <LayoutDashboard size={24} />
                </div>
                <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm text-gray-800">New task assigned to Team Alpha</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;