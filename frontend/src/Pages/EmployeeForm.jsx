import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import allStore from '../store/allStore';

const EmployeeForm = () => {
    const { logout, user, addEmployee } = allStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        designation: 'HR',
        gender: '',
        courses: [],
        image: null,
    }); 

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevState) => {
            const newCourses = checked
                ? [...prevState.courses, value]
                : prevState.courses.filter((course) => course !== value);
            return {
                ...prevState,
                courses: newCourses,
            };
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEmployee(formData);
            console.log('Employee data:', formData);

            // Show a success alert
            alert('Employee added successfully!');

            navigate('/employeeList'); 
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Failed to add employee!');
        }
    };

    return (
        <>
           <header className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg flex items-center justify-between px-8 py-4 rounded-b-lg">
                <div className="font-bold text-2xl tracking-wider text-white">
                    Dashboard
                </div>
                <nav className="flex space-x-4">
                    <button
                        className="py-2 px-6 bg-white text-blue-600 font-medium rounded-full shadow-md transition-all duration-300 transform hover:bg-blue-700 hover:text-white hover:scale-105"
                        onClick={() => navigate('/home')}
                    >
                        Home
                    </button>
                    <button
                        className="py-2 px-6 bg-white text-blue-600 font-medium rounded-full shadow-md transition-all duration-300 transform hover:bg-red-600 hover:text-white hover:scale-105"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </nav>
            </header>


            <div className="max-w-lg mx-auto p-8 bg-emerald-400 shadow-2xl rounded-lg">
    <h2 className="text-3xl font-bold text-center text-white mb-8">Employee Form</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="block text-sm font-semibold text-white">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
            />
        </div>

        <div>
            <label className="block text-sm font-semibold text-white">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
            />
        </div>

        <div>
            <label className="block text-sm font-semibold text-white">Mobile No</label>
            <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
            />
        </div>

        <div>
            <label className="block text-sm font-semibold text-white">Designation</label>
            <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
        </div>

        <div>
            <label className="block text-sm font-semibold text-white">Gender</label>
            <div className="mt-2 flex space-x-6">
                <label className="flex items-center text-white">
                    <input
                        type="radio"
                        name="gender"
                        value="M"
                        checked={formData.gender === 'M'}
                        onChange={handleChange}
                        className="mr-2 focus:ring-blue-500"
                    />
                    Male
                </label>
                <label className="flex items-center text-white">
                    <input
                        type="radio"
                        name="gender"
                        value="F"
                        checked={formData.gender === 'F'}
                        onChange={handleChange}
                        className="mr-2 focus:ring-blue-500"
                    />
                    Female
                </label>
            </div>
        </div>

        <div>
            <label className="block text-sm font-semibold text-white">Course</label>
            <div className="mt-2 flex flex-col space-y-2">
                <label className="flex items-center text-white">
                    <input
                        type="checkbox"
                        value="MCA"
                        checked={formData.courses.includes('MCA')}
                        onChange={handleCheckboxChange}
                        className="mr-2 focus:ring-blue-500"
                    />
                    MCA
                </label>
                <label className="flex items-center text-white">
                    <input
                        type="checkbox"
                        value="BCA"
                        checked={formData.courses.includes('BCA')}
                        onChange={handleCheckboxChange}
                        className="mr-2 focus:ring-blue-500"
                    />
                    BCA
                </label>
                <label className="flex items-center text-white">
                    <input
                        type="checkbox"
                        value="BSC"
                        checked={formData.courses.includes('BSC')}
                        onChange={handleCheckboxChange}
                        className="mr-2 focus:ring-blue-500"
                    />
                    BSC
                </label>
            </div>
        </div>

        <div>
            <label className="block text-sm font-semibold text-white">Image Upload</label>
            <input
                type="file"
                onChange={handleFileChange}
                className="w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </div>

        <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-white-600 transition duration-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
        >
            Submit
        </button>
    </form>
</div>

        </>
    );
};

export default EmployeeForm;
