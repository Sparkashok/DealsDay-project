import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    designation: {
        type: String,
        required: true,
        enum: ["HR", "Manager", "Sales"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["M", "F"]
    },
    course: {
        type: [String],
        enum: ["MCA", "BCA", "BSC"],
        default: []
    },
});

export const Employee = mongoose.model("Employee", EmployeeSchema);
