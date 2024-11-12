import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import { employeeDB } from "./db/employeeDB.js";
import router from "./routes/web.route.js";
import cors from 'cors';


dotenv.config();
const app = express();
const PORT=process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// Enable CORS
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Define routes
app.use("/api/routes/", router);

// Start server and connect to database
app.listen(PORT, async () => {
    await connectDB();
    await employeeDB();
    console.log(`Server is running on port ${PORT}`);
});
