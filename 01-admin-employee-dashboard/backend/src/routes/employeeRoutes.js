import express from "express"

import {
    getAllEmployees,
    getEmployeeID,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/employeeController.js"

const router = express.Router();

//GET all employees
router.get("/", getAllEmployees)

//GET employee id
router.get("/:id", getEmployeeID);

//CREATE employee
router.post("/", createEmployee);

//UPDATE employee
router.put("/:id", updateEmployee)

//DELETE employee
router.delete("/:id", deleteEmployee)

export default router