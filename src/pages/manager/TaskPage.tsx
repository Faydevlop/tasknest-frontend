import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import {enUS} from 'date-fns/locale/en-US';
import {isSameDay} from 'date-fns/isSameDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CheckSquare, Clock, AlertCircle, Trash2, Edit, Filter, Plus, Calendar as CalendarIcon, X, Menu } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Task = {
  id: string;
  title: string;
  assignedTo: string;
  status: 'done' | 'pending' | 'inProgress';
  description: string;
  dueDate: Date;
};

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    assignedTo: 'John Doe',
    status: 'inProgress',
    description: 'Create a detailed project proposal for the new client',
    dueDate: new Date(2024, 2, 25),
  },
  {
    id: '2',
    title: 'Review Q1 Reports',
    assignedTo: 'Jane Smith',
    status: 'pending',
    description: 'Review and analyze Q1 performance reports',
    dueDate: new Date(2024, 2, 26),
  },
  {
    id: '3',
    title: 'Team Meeting',
    assignedTo: 'John Doe',
    status: 'done',
    description: 'Weekly team sync meeting',
    dueDate: new Date(2024, 2, 27),
  },
  {
    id: '4',
    title: 'Client Presentation',
    assignedTo: 'Sarah Johnson',
    status: 'inProgress',
    description: 'Present project progress to the client',
    dueDate: new Date(2024, 2, 28),
  },
  {
    id: '5',
    title: 'Code Review',
    assignedTo: 'Mike Wilson',
    status: 'pending',
    description: 'Review pull requests for the new feature',
    dueDate: new Date(2024, 2, 25),
  }
];

const TasksPage = () => {
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [filter, setFilter] = React.useState<Task['status'] | 'all'>('all');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inProgress':
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredTasks = mockTasks.filter((task) => {
    const matchesStatus = filter === 'all' || task.status === filter;
    const matchesDate = !selectedDate || isSameDay(task.dueDate, selectedDate);
    return matchesStatus && matchesDate;
  });

  const calendarEvents = mockTasks.map((task) => ({
    title: task.title,
    start: task.dueDate,
    end: task.dueDate,
    resource: task,
  }));

  return (
    <div className="flex h-screen">
     {/* Sidebar - Fixed width and height */}
     
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
    
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex-1 p-6 bg-gray-50 overflow-auto">

 {/* Sidebar */}


      {/* Header */}
      <div className="mb-6 flex justify-between items-center">

    

        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
          {selectedDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarIcon size={16} />
              <span>Filtering by: {format(selectedDate, 'MMMM dd, yyyy')}</span>
              <button 
                onClick={() => setSelectedDate(null)}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear
              </button>
            </div>
          )}
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>New Task</span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Calendar and Filters */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
        

          {/* Calendar Card */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Calendar</h2>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 400 }}
              onSelectEvent={(event:any) => {
                setSelectedDate(event.start);
                setSelectedTask(event.resource);
              }}
              onSelectSlot={({ start }:any) => {
                setSelectedDate(start);
                setSelectedTask(null);
              }}
              selectable
              views={['month']}
              className="text-sm"
              tooltipAccessor={(event:any) => event.title}
            />
          </div>
            {/* Status Filter Card */}
            <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Filter by Status</h2>
            <div className="space-y-2">
              {['all', 'done', 'pending', 'inProgress'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as Task['status'] | 'all')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === status
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {status !== 'all' && getStatusIcon(status as Task['status'])}
                    <span className="capitalize">{status === 'inProgress' ? 'In Progress' : status}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        

        {/* Middle Column - Task List */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-xl shadow-sm p-4 h-[calc(100vh-11rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Tasks</h2>
              <span className="text-sm text-gray-500">
                {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
              </span>
            </div>
            {filteredTasks.length > 0 ? (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      selectedTask?.id === task.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTask(task)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <span>Assigned to:</span>
                            <span className="font-medium">{task.assignedTo}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>Due:</span>
                            <span className="font-medium">
                              {format(task.dueDate, 'MMM dd, yyyy')}
                            </span>
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                        {task.status === 'inProgress' ? 'In Progress' : task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No tasks found for the selected filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Task Details */}
        <div className="col-span-12 lg:col-span-3">
          {selectedTask ? (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Task Details</h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit size={18} className="text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Title</h3>
                  <p className="text-gray-900">{selectedTask.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h3>
                  <p className="text-gray-900">{selectedTask.assignedTo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTask.status)}`}>
                    {getStatusIcon(selectedTask.status)}
                    <span className="capitalize">
                      {selectedTask.status === 'inProgress' ? 'In Progress' : selectedTask.status}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date</h3>
                  <p className="text-gray-900">
                    {format(selectedTask.dueDate, 'MMMM dd, yyyy')}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedTask.description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-4 text-center text-gray-500">
              <p className="text-sm">Select a task to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TasksPage;