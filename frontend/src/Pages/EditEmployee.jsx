import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import allStore from '../store/allStore';
import axios from 'axios';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateEmployee } = allStore();
    
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        designation: '',
        mobileNumber: '',
        gender: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/routes/employees/edit-employee/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedEmployee = {
                ...employee,
                gender: employee.gender === 'Male' ? 'M' : employee.gender === 'Female' ? 'F' : employee.gender,
            };

            const result = await updateEmployee(id, updatedEmployee);
            if (result.message === 'Employee updated successfully') {
                alert('Employee details updated successfully!');
                navigate('/employeeList');
            } else {
                alert(result.message || 'Failed to update employee details. Please try again.');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Failed to update employee details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <nav className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center text-white">
                    <h1 className="text-3xl font-semibold">Employee Manager</h1>
                    <ul className="flex space-x-6 text-lg">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/employees" className="hover:underline">Employees</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                    </ul>
                </div>
            </nav>
            <div className="min-h-screen flex flex-col">
                <div className="flex items-center justify-center p-8 mt-8">
                    <div className="w-full max-w-2xl p-10 bg-emerald-400 rounded-lg shadow-xl space-y-6">
                        <h2 className="text-3xl font-bold text-center text-gray-800">Edit Employee Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        value={id}
                                        disabled
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="serialNo" className="block text-sm font-medium text-gray-700">Serial No.</label>
                                    <input
                                        type="text"
                                        id="serialNo"
                                        name="serialNo"
                                        value={employee.serialNo || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={employee.name || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={employee.email || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                                <input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    value={employee.designation || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={employee.mobileNumber || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={employee.gender || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className={`w-full px-4 py-2 text-white rounded-md focus:outline-none ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditEmployee;
