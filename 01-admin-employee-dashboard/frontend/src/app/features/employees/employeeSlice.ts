import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Employee data structure
export interface Employee {
    id: number;
    name: string;
    role: string;
    department: string;
    email: string;
    created_at?: string;
}

// Employee state structure
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
});

export const {
    addEmployee,
    updateEmployee,
    deleteEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;