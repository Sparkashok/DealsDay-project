import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/routes";
axios.defaults.withCredentials = true;

const allStore = create((set) => ({
	isAuthenticated: false,
	user: null,
	error: null,
	loading: false,
	message: null,

	login: async (username, password) => {
		set({ loading: true });
		try {
			const response = await axios.post(`${API_URL}/login`, { username, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null, // Clear any previous errors on successful login
				loading: false,
				message: response.data.message,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in" });
			throw error; // Optional: re-throw the error if you need to catch it elsewhere
		}
	},
	logout: () => set({ user: null, isAuthenticated: false }),
 
	addEmployee: async(formData)=>{
		try {
			const response = await axios.post(`${API_URL}/addEmployee`,formData,{
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.status === 201) {
				console.log("Employee added successfully:", response.data);
				return response.data; 
			} else {
				console.error("Unexpected response status:", response.status);
				return { message: "Failed to add employee." };
			}
		} catch (error) {
			console.error("Error adding employee:", error.response?.data || error.message);
        	return { message: "An error occurred while adding the employee." };
		}
	},

	updateEmployee: async (id, updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/employees/${id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log("Employee updated successfully:", response.data);
                return response.data;
            } else {
                console.error("Unexpected response status:", response.status);
                return { message: "Failed to update employee." };
            }
        } catch (error) {
            console.error("Error updating employee:", error.response?.data || error.message);
            return { message: "An error occurred while updating the employee." };
        }
    },
}));

export default allStore;
