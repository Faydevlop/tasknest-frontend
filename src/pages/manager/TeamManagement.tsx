import  { useEffect, useState } from 'react';
import { Users, CheckSquare, Clock, Search, MoreVertical, X, Menu } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { userApi } from '../../services/api';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import SelectUserModal from '../../components/TeamManagement/SelectUserModal'
import toast from 'react-hot-toast';


type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  taskCounts:any;
  tasksCompleted: number;
  tasksInProgress: number;
  avatar: string;
};





const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUser] = useState<Employee[]>([])
  const { user } = useSelector((state: RootState) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  useEffect(()=>{
    if (user?._id) {
      userApi.getUsers().then(users => {
        setUser(users);
        console.log(users);
      });
    }

  },[])

  

  const filteredEmployees = users.filter(employee =>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <CheckSquare size={16} className="text-green-500" />
                          <span className="text-sm text-gray-600">{employee.taskCounts.completed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-blue-500" />
                          <span className="text-sm text-gray-600">{employee.taskCounts.pending}</span>
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
                {users && users.length === 0 && <p className=' flex justify-center '>No employees found</p>}
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
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Task Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-semibold text-green-600">{selectedEmployee.tasksCompleted}</div>
                      <div className="text-sm text-green-600">Completed {selectedEmployee.taskCounts.completed}</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-semibold text-blue-600">{selectedEmployee.tasksInProgress}</div>
                      <div className="text-sm text-blue-600">Pending {selectedEmployee.taskCounts.pending}</div>
                    </div>
                  </div>
                </div>
                <button onClick={openModal} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 w-full rounded-lg transition">
  Promote to manger
</button>
<SelectUserModal isOpen={isModalOpen} onClose={closeModal} selectedUser={selectedEmployee._id} />


              
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