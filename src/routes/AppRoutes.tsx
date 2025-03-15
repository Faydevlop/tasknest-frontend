import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Otppage from '../pages/auth/Otppage';

// Admin pages
import Dashboard from '../pages/manager/Dashboard'
import TeamManagement from '../pages/manager/TeamManagement';
import TasksPage from '../pages/manager/TaskPage';
import Profile from '../pages/common/Profile-page';


// import TaskPage from '../pages/manager/TaskPage';


// TODO: Import ProtectedRoute and Other Pages Once Ready

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} /> 
      <Route path="/auth/verifyOTP" element={<Otppage />} /> 

      {/* TODO: Add Protected Routes After Setting Up Redux */}
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/manager/dashboard" element={<Dashboard />} />
        <Route path="/manager/tasks" element={<TasksPage />} />
        <Route path="/manager/users" element={<TeamManagement />} />
        <Route path="/manager/settings" element={<Profile />} />
      {/* </Route> */}

      {/* Redirect to Login if No Routes Match */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AppRoutes;
