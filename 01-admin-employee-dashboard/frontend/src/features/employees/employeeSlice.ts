
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "./employeeTypes";
import { fetchEmployees, createEmployee, updateEmployeeAPI, deleteEmployeeAPI, } from "./employeeThunks";

interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,

    reducers: {
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.employees.push(action.payload);
        },

        updateEmployee: (state, action: PayloadAction<Employee>) => {
            const index = state.employees.findIndex(
                (employee) => employee.id === action.payload.id
            );

            if (index !== -1) {
                state.employees[index] = action.payload;
            }
        },

        deleteEmployee: (state, action: PayloadAction<number>) => {
            state.employees = state.employees.filter(
                (employee) => employee.id !== action.payload
            );
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Something went wrong";
            })

            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.push(action.payload);
            })
            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to create employee";
            })

            .addCase(updateEmployeeAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeAPI.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.employees.findIndex(
                    (employee) => employee.id === action.payload.id
                );

                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(updateEmployeeAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to update employee";
            })

            .addCase(deleteEmployeeAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployeeAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = state.employees.filter(
                    (employee) => employee.id !== action.payload
                );
            })
            .addCase(deleteEmployeeAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to delete employee";
            })
    },
});

export const {
    addEmployee,
    updateEmployee,
    deleteEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
