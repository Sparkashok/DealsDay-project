import express from 'express';
import { login, addEmployee, employeeList, deleteEmployee, updateEmployee } from '../controllers/web.controller.js';


const router = express.Router();





// Routes
router.post("/login", login);
router.get("/employees", employeeList);
router.post("/addEmployee",addEmployee);
router.delete("/employees/:id", deleteEmployee);
router.put("/employees/edit-employee/:id", updateEmployee);

export default router;
