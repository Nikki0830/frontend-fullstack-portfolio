
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/employeeApi";
import type { Employee } from "./employeeTypes";

// GET: Fetch all employees
export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get("/employees");
            return response.data as Employee[];
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch employees"
            );
        }
    }
);

// POST: Create a new employee
export const createEmployee = createAsyncThunk<
    Employee,
    Omit<Employee, "id" | "created_at">,
    { rejectValue: string }
>(
    "employees/createEmployee",
    async (employeeData, { rejectWithValue }) => {
        try {
            const response = await API.post("/employees", employeeData);
            return response.data.employee as Employee;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create employee"
            );
        }
    }
);


// PUT: Update an employee
export const updateEmployeeAPI = createAsyncThunk<
    Employee,
    Employee,
    { rejectValue: string }
>(
    "employees/updateEmployeeAPI",
    async (employeeData, { rejectWithValue }) => {
        try {
            const response = await API.put(
                `/employees/${employeeData.id}`,
                employeeData
            );
            return response.data.employee as Employee;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update employee"
            );
        }
    }
);


// DELETE: Delete an employee
export const deleteEmployeeAPI = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>(
    "employees/deleteEmployeeAPI",
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/employees/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete employee"
            );
        }
    }
);
