import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/DashboardComponents/Navbar';
import Statistics from './DashboardPages/Dashboard';
import Coding from './DashboardPages/Coding';
import Gaming from './DashboardPages/Gaming';
import Trading from './DashboardPages/Trading';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Fixed Navbar at the top */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Main content area with padding to account for fixed navbar */}
      <main className="flex-grow pt-16">
        <Routes>
          {/* Default route redirects to /dashboard/coding */}
          <Route path="/" element={<Navigate to="/dashboard/coding" replace />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/trading" element={<Trading />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
