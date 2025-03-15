import React, { useState } from 'react';
import { Users, Plus, CheckSquare, Clock, AlertCircle, Search, Filter, MoreVertical, X, Menu } from 'lucide-react';
import { format } from 'date-fns';
import AdminSidebar from '../../components/AdminSidebar';

type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  tasksCompleted: number;
  tasksInProgress: number;
  avatar: string;
};

type Task = {
  id: string;
  title: string;
  status: 'done' | 'pending' | 'inProgress';
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
};

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Frontend Developer',
    department: 'Engineering',
    tasksCompleted: 15,
    tasksInProgress: 3,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'UI/UX Designer',
    department: 'Design',
    tasksCompleted: 12,
    tasksInProgress: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@company.com',
    role: 'Backend Developer',
    department: 'Engineering',
    tasksCompleted: 18,
    tasksInProgress: 4,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    status: 'inProgress',
    dueDate: new Date(2024, 2, 28),
    priority: 'high',
  },
  {
    id: '2',
    title: 'Design landing page mockups',
    status: 'done',
    dueDate: new Date(2024, 2, 25),
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Set up API endpoints',
    status: 'pending',
    dueDate: new Date(2024, 2, 30),
    priority: 'high',
  },
];

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return <CheckSquare className="text-green-500" />;
      case 'pending':
        return <Clock className="text-yellow-500" />;
      case 'inProgress':
        return <AlertCircle className="text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <AdminSidebar isSidebarOpen={isSidebarOpen} />
      {/* Header */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>
          <button
            onClick={() => setShowAssignTask(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Assign Task</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>
      </div>
      

      <div className="grid grid-cols-12 gap-6">
        {/* Employee List */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tasks</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{employee.role}</td>
                    <td className="px-6 py-4 text-gray-600">{employee.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <CheckSquare size={16} className="text-green-500" />
                          <span className="text-sm text-gray-600">{employee.tasksCompleted}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-blue-500" />
                          <span className="text-sm text-gray-600">{employee.tasksInProgress}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <MoreVertical size={20} className="text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Employee Details */}
        <div className="col-span-12 lg:col-span-4">
          {selectedEmployee ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900">{selectedEmployee.name}</h2>
                <p className="text-gray-500">{selectedEmployee.role}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                  <p className="text-gray-900">{selectedEmployee.email}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Department</h3>
                  <p className="text-gray-900">{selectedEmployee.department}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Task Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-semibold text-green-600">{selectedEmployee.tasksCompleted}</div>
                      <div className="text-sm text-green-600">Completed</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-semibold text-blue-600">{selectedEmployee.tasksInProgress}</div>
                      <div className="text-sm text-blue-600">In Progress</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Tasks</h3>
                  <div className="space-y-3">
                    {mockTasks.map((task) => (
                      <div key={task.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(task.status)}
                          <div>
                            <div className="font-medium text-gray-900">{task.title}</div>
                            <div className="text-sm text-gray-500">
                              Due {format(task.dueDate, 'MMM dd, yyyy')}
                            </div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
              <Users size={40} className="mx-auto mb-4 text-gray-400" />
              <p>Select an employee to view details</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default EmployeesPage;