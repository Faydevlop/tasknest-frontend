import { useState, useEffect } from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { useCalendar } from '../contexts/CalendarContext';

const IndependentTaskModal = ({ task, onClose}:any) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [tasksId,setTasksId] = useState('')
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('pending');
  const [assignedTo, setAssignedTo] = useState('');
  const {deleteTask,updateTask} = useCalendar()

  useEffect(() => {
    if (task) {
        setTasksId(task._id || '')
      setTaskTitle(task.title || '');
      setTaskDescription(task.description || '');
      setTaskStatus(task.status || 'pending');
      setAssignedTo(task.assignedTo || '');
    }
  }, [task]);

  const handleUpdate = () => {
    updateTask({tasksId,taskTitle,taskDescription,taskStatus})
    onClose();
  };

  const handleComplete = () => {
    updateTask({ tasksId, taskStatus });
    onClose();
  };

  const onDelete = (taskId: any) => {
    // Handle delete logic here
    deleteTask(taskId)
    onClose()
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Task Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">✖</button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {user?.role !== 'Employee' && (
            <div>
              <label className="block text-sm font-medium mb-1">Assigned To</label>
              <input
                type="text"
                disabled
                value={assignedTo?.name}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          <div className="flex justify-end gap-2 border-t pt-4">
          {user?.role === 'Employee' ? (
              <button
                type="button"
                onClick={handleComplete}
                className="px-4 py-2 rounded-md text-sm text-white bg-green-600 hover:bg-green-700"
              >
                Update status
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onDelete(task._id)}
                  className="px-4 py-2 border rounded-md text-sm text-red-700 bg-red-100 hover:bg-red-200"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Update
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndependentTaskModal;
