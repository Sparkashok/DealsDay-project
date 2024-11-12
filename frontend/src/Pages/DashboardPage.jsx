import React from 'react';
import { useNavigate } from 'react-router-dom';
import allStore from '../store/allStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = allStore(); 

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
    {/* Top Navigation Bar */}
    <header className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg flex items-center justify-between px-8 py-4">
      <div className="font-bold text-2xl tracking-wide">
        Dashboard
      </div>
      <nav className="flex space-x-4">
        <button
          className="py-2 px-4 bg-white text-blue-600 font-medium rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white hover:scale-105"
          onClick={() => navigate('/home')}
        >
          Home
        </button>
        <button
          className="py-2 px-4 bg-white text-blue-600 font-medium rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white hover:scale-105"
          onClick={() => navigate('/employeelist')}
        >
          Employee List
        </button>
        <button
          className="py-2 px-4 bg-white text-blue-600 font-medium rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white hover:scale-105"
          onClick={() => navigate('/user')}
        >
          {user ? user.username : "Guest"}
        </button>
        <button
          className="py-2 px-4 bg-white text-blue-600 font-medium rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white hover:scale-105"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  
    {/* Main Content Area */}
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white shadow-inner rounded-lg mx-4 mt-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome to the Admin Panel
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl">
        Manage employees, view analytics, and customize settings with ease. Navigate through the panel using the options above.
      </p>
      <button
        className="mt-8 py-3 px-8 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 transition-transform transform hover:scale-105"
        onClick={() => navigate('/employeelist')}
      >
        Go to Employee List
      </button>
    </main>
  </div>
  
  );
};

export default Dashboard;
