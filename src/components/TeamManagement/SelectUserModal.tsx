import React, { useEffect, useState } from 'react';
import { userApi } from '../../services/api';
import toast from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const handleGetUsers = async () => {
    try {
      const users = await userApi.getUsers();
      const mappedUsers = users.map((user: any) => ({
        id: user._id,
        name: user.name,
        avatar: user.avatar,
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  useEffect(() => {
    handleGetUsers();
  }, []);
  
  const handleComplete = async () => {
    console.log('Selected User:', selectedUser);
    console.log('Selected User IDs:', selectedUserIds);
  
    try {
      await userApi.promotUser({ selectedUser, selectedUserIds });
      toast.success('Promotion success');
      onClose();
      handleGetUsers();  // Refresh the users after promotion
    } catch (error) {
      console.error("Error promoting user:", error);
      toast.error('Promotion failed');
    }
  };
  

  const handleCheckboxChange = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Select Users to Assign</h2>
        <ul>
        {users
  .filter((user) => user.id !== selectedUser)
  .map((user) => (
    <li key={user.id} className="flex items-center space-x-3 mb-2">
      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
      <span className="flex-1">{user.name}</span>
      <input
        type="checkbox"
        checked={selectedUserIds.includes(user.id)}
        onChange={() => handleCheckboxChange(user.id)}
      />
    </li>
))}
{users && users.length === 0 && <p>No employees found</p>}

        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Close
        </button>
        <button
          onClick={handleComplete}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
          Complete
        </button>
      </div>
    </div>
  );
};

export default Modal;
