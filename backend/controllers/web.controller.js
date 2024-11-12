import { User } from "../models/User.model.js";
import { Employee } from "../models/Employee.model.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
				...user._doc,
				password: undefined,
			},
        });
        console.log("API is working");
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const employeeList = async (req, res) => {
    try {
        const employees = await Employee.find();  
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error });
    }
};


export const addEmployee = async (req,res)=>{
    const { name, email, mobileNumber, designation, gender, courses, image } = req.body;
    try {
        const existingEmployee = await Employee.findOne({email});
        if(existingEmployee){
            return res.status(400).json({ message: "Employee with this email already exists." });
        }
        const newEmployee = new Employee({
            name,
            email,
            mobileNumber,
            designation,
            gender,
            courses,
            image
        });
        await newEmployee.save();
        res.status(201).json({
            message: "Employee added successfully.",
            employee: newEmployee
        });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ message: "Server error. Unable to add employee." });
    }
}

export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const updateEmployee = async (req, res) => {
    const { id } = req.params; 
    const { name, email, designation, mobileNumber, gender, course } = req.body; 

    try {
        const employee = await Employee.findByIdAndUpdate(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Input validation (if necessary)
        const validGenders = ['M', 'F'];
        if (gender && !validGenders.includes(gender)) {
            return res.status(400).json({ message: "Invalid gender value. Allowed values are 'M' and 'F'." });
        }

        // Update employee fields only if new values are provided
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.designation = designation || employee.designation;
        employee.mobileNumber = mobileNumber || employee.mobileNumber;
        employee.gender = gender || employee.gender;
        employee.course = course || employee.course;

        await employee.save();
        res.status(200).json({ message: "Employee updated successfully", employee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Failed to update employee" });
    }
};



