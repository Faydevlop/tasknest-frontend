import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';


// Auth Pages / common
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Otppage from '../pages/auth/Otppage';

// common pages
import Profile from '../pages/common/Profile'; 
import TasksPage from '../pages/common/TaskPage';

// Admin pages
import Dashboard from '../pages/manager/Dashboard'
import TeamManagement from '../pages/manager/TeamManagement';

// Employee pages
import EmployeeDashboard from '../pages/employee/Dashboard';
                  

// Protected Route Component
import ProtectedRoute from '../components/ProtectedRoute';
import { RootState } from '../store';


// import TaskPage from '../pages/manager/TaskPage';


// TODO: Import ProtectedRoute and Other Pages Once Ready

const AppRoutes: React.FC = () => {

    const { user } = useSelector((state: RootState) => state.auth);


  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} /> 
      <Route path="/auth/verifyOTP" element={<Otppage />} /> 

      {/* TODO: Add Protected Routes After Setting Up Redux */}
      <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
        <Route path="/manager/dashboard" element={<Dashboard />} />
        <Route path="/manager/tasks" element={<TasksPage />} />
        <Route path="/manager/users" element={<TeamManagement />} />
        <Route path="/manager/settings" element={<Profile />} />
      </Route>

      {/* Employee Routes */}
      <Route element={<ProtectedRoute allowedRoles={['Employee']} />}>
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/tasks" element={<TasksPage />} />
        <Route path="/employee/settings" element={<Profile />} />
      </Route>

      {/* Redirect to Login if No Routes Match */}
      <Route path="*" element={<Navigate to={user ? `/${user.role}/dashboard` : '/auth/login'} />} />
    </Routes>
  );
};

export default AppRoutes;
