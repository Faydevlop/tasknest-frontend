import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

// TODO: Import ProtectedRoute and Other Pages Once Ready

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />

      {/* TODO: Add Protected Routes After Setting Up Redux */}
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Route> */}

      {/* Redirect to Login if No Routes Match */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AppRoutes;
