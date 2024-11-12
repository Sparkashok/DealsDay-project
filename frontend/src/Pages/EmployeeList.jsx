import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import allStore from '../store/allStore';

const EmployeeList = () => {
    const { user, logout } = allStore();
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/routes/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-employee/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/routes/employees/${id}`);
            setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== id));
            alert('Employee has been deleted successfully');
        } catch (error) {
            console.error('Failed to delete employee:', error);
        }
    };

    const handleAddEmployee = () => {
        navigate('/employeeForm');  // Navigate to the Add Employee form
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Filter employees based on search term
    const filteredEmployees = employees.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
           <header className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg flex items-center justify-between px-8 py-4">
                    <div className="font-bold text-2xl tracking-wide">
                        Dashboard
                    </div>
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <span className="text-sm font-semibold bg-white text-blue-600 px-3 py-1 rounded-md shadow-sm">
                                {user.username || user.role}
                            </span>
                        ) : (
                            <span className="text-sm font-semibold bg-white text-blue-600 px-3 py-1 rounded-full shadow-sm">
                                Guest
                            </span>
                        )}
                        <nav className="flex space-x-4">
                            <button
                                className="py-2 px-5 bg-white text-blue-600 font-medium rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white hover:scale-105"
                                onClick={() => navigate('/home')}
                            >
                                Home
                            </button>
                            <button
                                className="py-2 px-5 bg-white text-blue-600 font-medium rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white hover:scale-105"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </nav>
                    </div>
                </header>

            {/* Add Employee Button */}
            <div className="max-w-8xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <button
                            onClick={handleAddEmployee}
                            className="py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-purple-700"
                        >
                            Add Employee
                        </button>
                    </div>
                    
                    {/* Search Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-center mb-6">Employee List</h2>

                {filteredEmployees.length > 0 ? (
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-black-600 uppercase text-sm leading-normal">
                                <th className="py-5 px-8 text-left">Id</th>
                                <th className="py-5 px-8 text-left">Serial No:</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Designation</th>
                                <th className="py-3 px-6 text-left">Mobile</th>
                                <th className="py-3 px-6 text-left">Gender</th>
                                <th className="py-3 px-6 text-left">Course</th>
                                <th className="py-3 px-6 text-left">Created Date</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-500 text-sm font-medium">
                            {filteredEmployees.map((employee, index) => (
                                <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-5 px-8 text-left">{employee._id}</td>
                                    <td className="py-5 px-8 text-left">{index+1}</td>
                                    <td className="py-3 px-6 text-left">{employee.name}</td>
                                    <td className="py-3 px-6 text-left">{employee.email}</td>
                                    <td className="py-3 px-6 text-left">{employee.designation}</td>
                                    <td className="py-3 px-6 text-left">{employee.mobileNumber}</td>
                                    <td className="py-3 px-6 text-left">{employee.gender}</td>
                                    <td className="py-3 px-6 text-left">{employee.courses || 'MBA'}</td>
                                    <td className="py-3 px-6 text-left">{employee.createdAt || "10/11/2024"}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            className="px-3 py-1 bg-yellow-500 text-white rounded mx-1 my-1 hover:bg-yellow-600 mr-2"
                                            onClick={() => handleEdit(employee._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            onClick={() => handleDelete(employee._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">No employees found.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default EmployeeList;
