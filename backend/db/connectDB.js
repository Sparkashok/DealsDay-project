import mongoose from "mongoose";
import { User } from "../models/User.model.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        const existingUsers = await User.find({}).countDocuments();
        if (existingUsers === 0) {
            const users = [
                { username: "Hukum Gupta", password: "password1" },
                { username: "Abhishek", password: "password2" },
                { username: "Manisha koirala", password: "password3" },
            ];

            await User.insertMany(users);
            console.log("Users inserted successfully");
        } else {
            console.log("Users already exist in the database");
        }
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};
